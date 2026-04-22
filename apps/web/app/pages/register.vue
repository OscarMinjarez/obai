<script setup lang="ts">
import { RegisterPageView, useAuth } from '@obai/shared';
import { useRouter } from '#imports';

const router = useRouter();
const { register, isLoading, error } = useAuth();

async function handleRegister(payload: { name: string; email: string; pass: string }) {
  try {
    await register(payload.name, payload.email, payload.pass);
    router.push('/login');
  } catch (e) {
    console.error('Error en registro', e);
  }
}

function handleBack() {
  router.push('/');
}
</script>

<template>
  <div class="relative min-h-screen">
    <!-- Floating error indicator -->
    <p
      v-if="error"
      class="fixed top-6 left-1/2 -translate-x-1/2 z-[60] bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-2 rounded-full text-xs font-bold backdrop-blur-md animate-in fade-in slide-in-from-top-4"
    >
      {{ error }}
    </p>

    <RegisterPageView 
      title="Empieza hoy"
      subtitle="Crea tu cuenta de Obai"
      :loading="isLoading"
      @register="handleRegister"
      @back="handleBack"
    />
  </div>
</template>
