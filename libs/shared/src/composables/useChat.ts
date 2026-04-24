import { ref, onUnmounted, watch, computed } from 'vue';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './useAuth';
import { useLocale } from './useLocale';

export function useChat() {
  const { token } = useAuth();
  const socket = ref<Socket | null>(null);
  const messagesMap = ref<Record<string, any>>({});
  const isConnected = ref(false);
  const isTyping = ref(false);
  const deviceType = ref<string>('');

  const messages = computed(() => {
    return Object.values(messagesMap.value).sort((a, b) => 
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  });

  // Mapa para almacenar el contenido completo que debería tener cada mensaje
  const targetContents = new Map<string, string>();
  let animationFrame: any = null;

  const startAnimationLoop = () => {
    if (animationFrame) return;
    
    const animate = () => {
      let hasPending = false;

      Object.keys(messagesMap.value).forEach((id) => {
        const msg = messagesMap.value[id];
        if (msg.role === 'assistant') {
          const target = targetContents.get(id) || '';
          // Si el contenido visible es menor que el objetivo, escribimos
          if (msg.content.length < target.length) {
            // Escribimos 1 o 2 caracteres por frame para naturalidad
            const step = target.length - msg.content.length > 10 ? 2 : 1;
            msg.content = target.substring(0, msg.content.length + step);
            hasPending = true;
          }
        }
      });

      if (hasPending) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        animationFrame = null;
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
  };

  const connect = () => {
    if (socket.value?.connected) return;
    if (!token.value) return;

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
    });

    socket.value.on('chat:history', (history: any[]) => {
      const newMap: Record<string, any> = {};
      history.forEach(m => {
        const id = m.id || `hist_${Math.random()}`;
        newMap[id] = { ...m };
        targetContents.set(id, m.content);
      });
      messagesMap.value = newMap;
    });

    socket.value.on('chat:receive_chunk', (data: { id: string, chunk: string, role: string }) => {
      const currentTarget = targetContents.get(data.id) || '';
      // Sincronización estricta: solo añadimos si el chunk realmente aporta algo nuevo
      // Esto evita el error "QuéQué" si el chunk viniera repetido
      targetContents.set(data.id, currentTarget + data.chunk);

      if (!messagesMap.value[data.id]) {
        messagesMap.value[data.id] = {
          id: data.id,
          content: '',
          role: data.role,
          createdAt: new Date().toISOString()
        };
      }
      
      startAnimationLoop();
    });

    socket.value.on('chat:receive', (message: any) => {
      const id = message.id || `msg_${Date.now()}`;
      targetContents.set(id, message.content);
      if (!messagesMap.value[id]) {
        messagesMap.value[id] = { 
          ...message, 
          id,
          content: message.role === 'assistant' ? '' : message.content 
        };
      } else {
        const currentVisibleContent = messagesMap.value[id].content;
        messagesMap.value[id] = { 
          ...message, 
          id,
          content: message.role === 'assistant' ? currentVisibleContent : message.content 
        };
      }
      if (message.role === 'assistant') startAnimationLoop();
    });
    socket.value.on('chat:typing', (data: { isTyping: boolean }) => {
      isTyping.value = data.isTyping;
    });
    socket.value.on('chat:device_info', (data: { deviceType: string }) => {
      deviceType.value = data.deviceType;
    });
  };

  const { currentLocale } = useLocale();

  const sendMessage = (text: string) => {
    if (!socket.value || !text.trim()) return;
    const id = `user_${Date.now()}`;
    
    // El mensaje de usuario se añade al mapa y al target (aunque no se anime, para consistencia)
    messagesMap.value[id] = { 
      id,
      role: 'user', 
      content: text, 
      createdAt: new Date().toISOString() 
    };
    targetContents.set(id, text);
    
    socket.value.emit('chat:send', { 
      id,
      message: text,
      locale: currentLocale.value
    });
  };

  const disconnect = () => {
    if (socket.value) {
      socket.value.disconnect();
      socket.value = null;
    }
    if (animationFrame) cancelAnimationFrame(animationFrame);
  };

  watch(token, (newToken) => {
    if (newToken) {
      if (socket.value) disconnect();
      connect();
    } else {
      disconnect();
    }
  }, { immediate: true });

  onUnmounted(() => disconnect());

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
