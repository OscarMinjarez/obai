<script setup lang="ts">
import { LoginPageView, useAuth, useAgents } from '@obai/shared';
import { useRouter } from '#imports';

const router = useRouter();
const { login, isLoading, error } = useAuth();
const { getMyAgent } = useAgents();

async function handleLogin(payload: { email: string; pass: string }) {
  try {
    await login(payload.email, payload.pass);
    
    // Verificamos si ya tiene un agente para saltar el onboarding
    const agent = await getMyAgent();
    if (agent) {
      router.push('/chat');
    } else {
      router.push('/onboarding');
    }
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
