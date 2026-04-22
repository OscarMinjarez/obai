<script setup lang="ts">
import RegisterPageView from '@obai/shared/pages/RegisterPageView.vue';
import { useAuth } from '@obai/shared/composables/useAuth';
import { useRouter } from '#imports';

const router = useRouter();
const { register, login, isLoading, error } = useAuth();

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
  <main class="min-h-screen bg-background text-foreground">
    <p v-if="error" class="text-red-500 text-center py-2">{{ error }}</p>
    <RegisterPageView 
      title="Crear Cuenta"
      subtitle="Regístrate en Web"
      :loading="isLoading"
      @register="handleRegister"
      @back="handleBack"
    />
  </main>
</template>
