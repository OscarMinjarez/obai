<script setup lang="ts">
import { LoginPageView, useAuth, useAgents } from '@obai/shared';
import { useRouter } from '#imports';

const router = useRouter();
const { login, requestOtp, isLoading, error } = useAuth();
const { getMyAgent } = useAgents();

async function handleLogin(payload: { email: string; pass: string }) {
  try {
    await login(payload.email, payload.pass);
    await checkRedirect();
  } catch (e) {
    console.error('Error logueando en web', e);
  }
}

async function handleLoginOtp(email: string) {
  try {
    await requestOtp(email);
    // Guardar email de respaldo
    if (typeof window !== 'undefined') localStorage.setItem('obai_pending_email', email);
    
    // Redirigir a la página de verificación pasando el email por query
    router.push({
      path: '/verify-otp',
      query: { email, type: 'magiclink' }
    });
  } catch (e) {
    console.error('Error solicitando OTP en web', e);
  }
}

async function checkRedirect() {
  try {
    const agent = await getMyAgent();
    if (agent) {
      router.push('/chat');
    } else {
      router.push('/onboarding');
    }
  } catch {
    router.push('/onboarding');
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
    
    <LoginPageView 
      title="Bienvenido de nuevo" 
      subtitle="Accede a tu cuenta de Obai"
      :loading="isLoading"
      @login="handleLogin"
      @login-otp="handleLoginOtp"
      @back="handleBack"
    />
  </div>
</template>
