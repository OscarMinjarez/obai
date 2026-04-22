<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from 'vue';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { ScrollArea } from '../components/ui/scroll-area';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/card';
import { useChat } from '../composables/useChat';

const { messages, isTyping, isConnected, deviceType, connect, sendMessage } = useChat();
const newMessage = ref('');
const scrollAreaRef = ref<any>(null);
const textareaRef = ref<any>(null);

const adjustTextareaHeight = () => {
  const el = textareaRef.value?.$el?.querySelector('textarea');
  if (el) {
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
  }
};

watch(newMessage, () => {
  nextTick(adjustTextareaHeight);
});

const handleSend = () => {
  if (!newMessage.value.trim()) return;
  sendMessage(newMessage.value);
  newMessage.value = '';
  nextTick(adjustTextareaHeight); // Reset height after sending
};

const scrollToBottom = async () => {
  await nextTick();
  // Para shadcn-vue ScrollArea, necesitamos acceder al viewport interno
  const viewport = scrollAreaRef.value?.$el?.querySelector('[data-radix-scroll-area-viewport]');
  if (viewport) {
    viewport.scrollTop = viewport.scrollHeight;
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
  <Card class="flex h-full w-full flex-col overflow-hidden border-none shadow-none rounded-none bg-background">
    <!-- Header -->
    <CardHeader class="flex shrink-0 flex-row items-center justify-between border-b bg-card/50 px-6 py-4 backdrop-blur-md space-y-0">
      <div class="flex items-center gap-3">
        <div class="relative">
          <Avatar class="h-10 w-10 border border-primary/20">
            <AvatarImage src="" alt="Asistente" />
            <AvatarFallback class="bg-primary/10">
              <slot name="avatar">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
              </slot>
            </AvatarFallback>
          </Avatar>
          <div :class="['absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background', isConnected ? 'bg-green-500' : 'bg-red-500']"></div>
        </div>
        <div>
          <CardTitle class="text-lg font-bold leading-none tracking-tight">
            <slot name="title">Asistente Obai</slot>
          </CardTitle>
          <p class="text-[10px] text-muted-foreground mt-1 flex items-center gap-1.5 font-medium uppercase tracking-wider">
            <span :class="['h-1.5 w-1.5 rounded-full', isConnected ? 'bg-green-500' : 'bg-red-500']"></span>
            {{ isConnected ? 'En línea' : 'Desconectado' }}
            <span v-if="deviceType" class="opacity-40">•</span>
            <span v-if="deviceType" class="opacity-70">{{ deviceType }}</span>
          </p>
        </div>
      </div>
      <slot name="actions"></slot>
    </CardHeader>

    <!-- Messages List -->
    <CardContent class="flex-1 p-0 overflow-hidden">
      <ScrollArea ref="scrollAreaRef" class="h-full w-full">
        <div class="mx-auto w-full max-w-3xl flex flex-col gap-4 p-6 sm:p-8">
          <!-- Empty State -->
          <div v-if="messages.length === 0" class="flex h-[400px] flex-col items-center justify-center space-y-3 text-muted-foreground opacity-60">
            <div class="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </div>
            <p class="text-sm font-medium">No hay mensajes. Di algo para comenzar.</p>
          </div>

          <!-- Messages -->
          <div 
            v-for="(msg, i) in messages" 
            :key="i"
            :class="['flex w-full animate-in fade-in slide-in-from-bottom-2 duration-300', msg.role === 'user' ? 'justify-end' : 'justify-start']"
          >
            <div 
              :class="[
                'max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-2 text-sm shadow-sm transition-all',
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
            <div class="flex items-center gap-1.5 rounded-2xl bg-muted/50 border border-border/30 px-3 py-2 text-muted-foreground">
              <span class="flex gap-1">
                <span class="h-1.2 w-1.2 animate-bounce rounded-full bg-primary/40"></span>
                <span class="h-1.2 w-1.2 animate-bounce rounded-full bg-primary/40 [animation-delay:0.2s]"></span>
                <span class="h-1.2 w-1.2 animate-bounce rounded-full bg-primary/40 [animation-delay:0.4s]"></span>
              </span>
            </div>
          </div>
        </div>
      </ScrollArea>
    </CardContent>

    <!-- Input Area -->
    <CardFooter class="shrink-0 border-t bg-background p-3 sm:p-4">
      <div class="mx-auto flex w-full max-w-3xl items-end gap-2">
        <div class="relative flex-1">
          <Textarea 
            ref="textareaRef"
            v-model="newMessage"
            rows="1"
            placeholder="Escribe un mensaje..." 
            class="flex !min-h-[40px] w-full resize-none rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background transition-all placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50"
            @keydown.enter.prevent="handleSend"
          />
        </div>
        <Button 
          @click="handleSend" 
          size="icon"
          class="h-10 w-10 shrink-0 rounded-md shadow-sm transition-all active:scale-95" 
          :disabled="!newMessage.trim()"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
        </Button>
      </div>
    </CardFooter>
  </Card>
</template>
