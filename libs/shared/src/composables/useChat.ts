import { ref, onUnmounted, watch } from 'vue';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './useAuth';
import { useLocale } from './useLocale';

export function useChat() {
  const { token } = useAuth();
  const socket = ref<Socket | null>(null);
  const messages = ref<any[]>([]);
  const isConnected = ref(false);
  const isTyping = ref(false);
  const deviceType = ref<string>('');

  const connect = () => {
    if (socket.value?.connected) return;
    if (!token.value) {
      console.warn('Cannot connect to socket: No token available');
      return;
    }
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
    socket.value.on('chat:device_info', (data: { deviceType: string }) => {
      console.log('📱 Dispositivo detectado:', data.deviceType);
      deviceType.value = data.deviceType;
    });
    socket.value.on('chat:error', (err: any) => {
      console.error('Socket error:', err);
    });
  };

  const { currentLocale } = useLocale();

  const sendMessage = (text: string) => {
    if (!socket.value || !text.trim()) return;
    const userMsg = { 
      role: 'user', 
      content: text, 
      createdAt: new Date().toISOString() 
    };
    messages.value.push(userMsg);
    
    socket.value.emit('chat:send', { 
      message: text,
      locale: currentLocale.value
    });
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
    deviceType,
    connect,
    sendMessage,
    disconnect,
  };
}
