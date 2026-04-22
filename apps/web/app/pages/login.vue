<script setup lang="ts">
import LoginPageView from '@obai/shared/pages/LoginPageView.vue';
import { useAuth } from '@obai/shared/composables/useAuth'; // Asegúrate de resolver la ruta según el alias
import { useRouter } from '#imports';

const router = useRouter();
const { login, isLoading, error } = useAuth();

async function handleLogin(payload: { email: string; pass: string }) {
  try {
    await login(payload.email, payload.pass);
    router.push('/chat'); // o tu ruta principal web
  } catch (e) {
    console.error('Error logueando en web', e);
  }
}

function handleBack() {
  router.push('/');
}
</script>

<template>
  <main class="min-h-screen bg-background text-foreground">
    <p v-if="error" class="text-red-500 text-center py-2">{{ error }}</p>
    <LoginPageView 
      title="Iniciar Sesión (Web)" 
      subtitle="Acceso de Usuario"
      :loading="isLoading"
      @login="handleLogin"
      @back="handleBack"
    />
  </main>
</template>
