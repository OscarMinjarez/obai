<script setup lang="ts">
import { ref } from 'vue';
import { Button } from '../components/ui/button'; // Adjust import if needed, assuming alias doesn't work locally inside shared or we prefer relative. We'll use relative to be safe inside the lib.

defineProps<{
  title?: string;
  subtitle?: string;
  loading?: boolean;
}>();

const emit = defineEmits<{
  (e: 'login', payload: { email: string; pass: string }): void;
  (e: 'back'): void;
}>();

const email = ref('');
const password = ref('');

function handleSubmit() {
  emit('login', { email: email.value, pass: password.value });
}
</script>

<template>
  <div class="mx-auto flex min-h-[100svh] w-full max-w-md items-center justify-center p-4">
    <section class="w-full space-y-6 rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <div class="space-y-2">
        <p class="text-sm font-medium text-muted-foreground">{{ subtitle || 'Login' }}</p>
        <h1 class="text-3xl font-semibold tracking-tight">{{ title || 'Sign in' }}</h1>
        <p class="text-sm text-muted-foreground">Log in to sync across web and mobile.</p>
      </div>

      <form class="space-y-4" @submit.prevent="handleSubmit">
        <div class="space-y-2">
          <label class="text-sm font-medium leading-none">Email</label>
          <input 
            v-model="email" 
            type="email" 
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" 
            placeholder="you@example.com" 
            required 
          />
        </div>
        <div class="space-y-2">
          <label class="text-sm font-medium leading-none">Password</label>
          <input 
            v-model="password" 
            type="password" 
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" 
            placeholder="••••••••" 
            required 
          />
        </div>
        <div class="flex flex-col gap-3 sm:flex-row">
          <Button type="submit" :disabled="loading">
            <span v-if="loading">Cargando...</span>
            <span v-else>Entrar</span>
          </Button>
          <Button variant="outline" type="button" @click="$emit('back')">
            Atrás
          </Button>
        </div>
      </form>
    </section>
  </div>
</template>
