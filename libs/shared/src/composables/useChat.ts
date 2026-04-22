import { ref, onUnmounted, watch } from 'vue';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './useAuth';

export function useChat() {
  const { token } = useAuth();
  const socket = ref<Socket | null>(null);
  const messages = ref<any[]>([]);
  const isTyping = ref(false);
  const isConnected = ref(false);

  const connect = () => {
    if (socket.value?.connected) return;
    if (!token.value) {
      console.warn('Cannot connect to socket: No token available');
      return;
    }

    // Usamos el API_URL base para los sockets (quitando el /api si existe)
    const apiUrl = (typeof process !== 'undefined' && process.env?.VITE_API_URL) 
      ? process.env.VITE_API_URL 
      : (typeof window !== 'undefined' && (window as any)._env_?.VITE_API_URL) || 'http://localhost:8000/api';
    
    const baseUrl = apiUrl.replace('/api', '');

    socket.value = io(`${baseUrl}/chat`, {
      auth: { token: token.value },
      transports: ['websocket'],
    });

    socket.value.on('connect', () => {
      isConnected.value = true;
      console.log('Connected to chat socket');
    });

    socket.value.on('disconnect', () => {
      isConnected.value = false;
      console.log('Disconnected from chat socket');
    });

    socket.value.on('chat:history', (history: any[]) => {
      messages.value = history;
    });

    socket.value.on('chat:receive', (message: any) => {
      const lastMsg = messages.value[messages.value.length - 1];
      if (lastMsg && lastMsg.content === message.content && lastMsg.role === message.role) {
        return;
      }
      messages.value.push(message);
    });

    socket.value.on('chat:typing', (data: { isTyping: boolean }) => {
      isTyping.value = data.isTyping;
    });

    socket.value.on('chat:error', (err: any) => {
      console.error('Socket error:', err);
    });
  };

  const sendMessage = (text: string) => {
    if (!socket.value || !text.trim()) return;
    
    // Optimistic UI update
    const userMsg = { 
      role: 'user', 
      content: text, 
      createdAt: new Date().toISOString() 
    };
    messages.value.push(userMsg);
    
    socket.value.emit('chat:send', { message: text });
  };

  const disconnect = () => {
    if (socket.value) {
      socket.value.disconnect();
      socket.value = null;
    }
  };

  // Reconnect if token changes or becomes available
  watch(token, (newToken) => {
    if (newToken) {
      if (socket.value) disconnect();
      connect();
    } else {
      disconnect();
    }
  }, { immediate: true });

  onUnmounted(() => {
    disconnect();
  });

  return {
    messages,
    isTyping,
    isConnected,
    connect,
    sendMessage,
    disconnect,
  };
}
