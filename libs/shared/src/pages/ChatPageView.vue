<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from 'vue';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
// import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { ScrollArea } from '../components/ui/scroll-area';
// import { Card } from '../components/ui/card';
import { useChat } from '../composables/useChat';
// import { useAuth } from '../composables/useAuth';
// import { useRouter } from 'vue-router';
// import { LogOut, PanelLeft } from 'lucide-vue-next';
import { SidebarProvider, AppSidebar, SidebarInset, SidebarTrigger } from '../index';

const { messages, isTyping, connect, sendMessage } = useChat();

const newMessage = ref('');
const textareaRef = ref<any>(null);
const messagesEndRef = ref<HTMLElement | null>(null);

/*
const handleLogout = async () => {
  try {
    await logout();
    router.push('/login');
  } catch (e) {
    console.error('Logout failed', e);
  }
};
*/

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

const scrollToBottom = async (force = false) => {
  await nextTick();
  if (messagesEndRef.value) {
    messagesEndRef.value.scrollIntoView({ 
      behavior: force ? 'auto' : 'smooth',
      block: 'end'
    });
  }
};

onMounted(async () => {
  connect();
  // Scroll inicial al cargar los mensajes
  if (messages.value.length > 0) {
    scrollToBottom(true);
  }
});

watch(messages, () => {
  scrollToBottom();
}, { deep: true });

watch(isTyping, (typing) => {
  if (typing) scrollToBottom();
});
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset class="flex h-screen flex-col overflow-hidden bg-background">
      <!-- Top Navigation / Header -->
      <header class="flex shrink-0 items-center gap-2 bg-background px-4 pt-[var(--ion-safe-area-top,0px)] h-[calc(3.5rem+var(--ion-safe-area-top,0px))]">
        <SidebarTrigger class="-ml-1" />
        <div class="h-4 w-[1px] bg-border mx-1" />
        <div class="flex flex-1 items-center justify-between">
          <h1 class="text-sm font-semibold tracking-tight">
            <slot name="title">
              Asistente Obai
            </slot>
          </h1>
          <div class="flex items-center gap-2">
            <slot name="actions" />
          </div>
        </div>
      </header>

      <!-- Main Chat Area -->
      <main class="flex-1 overflow-hidden flex flex-col">
        <ScrollArea
          ref="scrollAreaRef"
          class="flex-1 w-full"
        >
          <div class="mx-auto w-full max-w-3xl flex flex-col gap-4 p-6 sm:p-8">
            <!-- Empty State -->
            <div
              v-if="messages.length === 0"
              class="flex h-[400px] flex-col items-center justify-center space-y-3 text-muted-foreground opacity-60"
            >
              <div class="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
              </div>
              <p class="text-sm font-medium">
                No hay mensajes. Di algo para comenzar.
              </p>
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
            <div
              v-if="isTyping"
              class="flex justify-start animate-in fade-in duration-200"
            >
              <div class="flex items-center gap-1.5 rounded-2xl bg-muted/50 border border-border/30 px-3 py-2 text-muted-foreground">
                <span class="flex gap-1">
                  <span class="h-1.2 w-1.2 animate-bounce rounded-full bg-primary/40" />
                  <span class="h-1.2 w-1.2 animate-bounce rounded-full bg-primary/40 [animation-delay:0.2s]" />
                  <span class="h-1.2 w-1.2 animate-bounce rounded-full bg-primary/40 [animation-delay:0.4s]" />
                </span>
              </div>
            </div>
          
            <!-- Anchor for scrolling -->
            <div
              ref="messagesEndRef"
              class="h-1 w-full opacity-0"
            />
          </div>
        </ScrollArea>
      </main>

      <!-- Input Area -->
      <footer class="shrink-0 bg-background p-3 sm:p-4">
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
            size="icon" 
            class="h-10 w-10 shrink-0 rounded-md shadow-sm transition-all active:scale-95"
            :disabled="!newMessage.trim()" 
            @click="handleSend"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>
          </Button>
        </div>
      </footer>
    </SidebarInset>
  </SidebarProvider>
</template>
