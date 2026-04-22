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

    // In a real app, this URL should be an env var
    const baseUrl = window.location.hostname === 'localhost' 
      ? 'http://localhost:8000' 
      : 'http://localhost:8000'; // Fallback for now

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
      // Remove typing indicator when real message arrives or just append
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

  // Reconnect if token changes
  watch(token, (newToken) => {
    if (newToken && socket.value) {
      disconnect();
      connect();
    }
  });

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
