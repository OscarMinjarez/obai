<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from 'vue';
import { Button } from '../components/ui/button';
import { useChat } from '../composables/useChat';

const { messages, isTyping, isConnected, connect, sendMessage } = useChat();
const newMessage = ref('');
const scrollContainer = ref<HTMLElement | null>(null);

const handleSend = () => {
  if (!newMessage.value.trim()) return;
  sendMessage(newMessage.value);
  newMessage.value = '';
};

const scrollToBottom = async () => {
  await nextTick();
  if (scrollContainer.value) {
    scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight;
  }
};

onMounted(() => {
  connect();
});

watch(messages, () => {
  scrollToBottom();
}, { deep: true });
</script>

<template>
  <div class="flex h-full w-full flex-col overflow-hidden bg-background">
    <!-- Header -->
    <header class="flex shrink-0 items-center justify-between border-b bg-card/50 px-6 py-4 backdrop-blur-md">
      <div class="flex items-center gap-3">
        <div class="relative">
          <div class="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
             <slot name="avatar">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
             </slot>
          </div>
          <div :class="['absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background', isConnected ? 'bg-green-500' : 'bg-red-500']"></div>
        </div>
        <div>
          <h1 class="text-lg font-bold leading-none tracking-tight">
            <slot name="title">Asistente Obai</slot>
          </h1>
          <p class="text-xs text-muted-foreground mt-1">
            {{ isConnected ? 'En línea' : 'Desconectado' }}
          </p>
        </div>
      </div>
      <slot name="actions"></slot>
    </header>

    <!-- Messages List -->
    <div ref="scrollContainer" class="flex-1 space-y-4 overflow-y-auto p-6 scroll-smooth">
      <div v-if="messages.length === 0" class="flex h-full flex-col items-center justify-center space-y-3 text-muted-foreground opacity-60">
        <div class="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        </div>
        <p class="text-sm font-medium">No hay mensajes. Di algo para comenzar.</p>
      </div>

      <div 
        v-for="(msg, i) in messages" 
        :key="i"
        :class="['flex w-full animate-in fade-in slide-in-from-bottom-2 duration-300', msg.role === 'user' ? 'justify-end' : 'justify-start']"
      >
        <div 
          :class="[
            'max-w-[85%] sm:max-w-[70%] rounded-2xl px-4 py-2.5 text-sm shadow-sm transition-all',
            msg.role === 'user' 
              ? 'bg-primary text-primary-foreground rounded-tr-none' 
              : 'bg-muted text-foreground rounded-tl-none border border-border/40'
          ]"
        >
          {{ msg.content }}
        </div>
      </div>

      <!-- Typing indicator -->
      <div v-if="isTyping" class="flex justify-start animate-in fade-in duration-200">
        <div class="flex items-center gap-1.5 rounded-2xl bg-muted/50 border border-border/30 px-4 py-3 text-muted-foreground">
          <span class="flex gap-1">
            <span class="h-1.5 w-1.5 animate-bounce rounded-full bg-primary/40"></span>
            <span class="h-1.5 w-1.5 animate-bounce rounded-full bg-primary/40 [animation-delay:0.2s]"></span>
            <span class="h-1.5 w-1.5 animate-bounce rounded-full bg-primary/40 [animation-delay:0.4s]"></span>
          </span>
        </div>
      </div>
    </div>

    <!-- Input Area -->
    <div class="shrink-0 border-t bg-card/30 p-4 backdrop-blur-md sm:p-6">
      <div class="mx-auto flex max-w-3xl gap-3">
        <div class="relative flex-1">
          <textarea 
            v-model="newMessage"
            rows="1"
            placeholder="Escribe un mensaje..." 
            class="flex min-h-[56px] w-full resize-none rounded-2xl border border-input bg-background px-6 py-4 text-base shadow-sm ring-offset-background transition-all placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
            @keydown.enter.prevent="handleSend"
          ></textarea>
        </div>
        <Button 
          @click="handleSend" 
          class="h-14 w-14 shrink-0 rounded-2xl shadow-lg transition-transform active:scale-95" 
          :disabled="!newMessage.trim()"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
        </Button>
      </div>
    </div>
  </div>
</template>
