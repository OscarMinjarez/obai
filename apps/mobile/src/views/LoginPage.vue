<template>
  <ion-page>
    <ion-content class="ion-padding bg-background text-foreground">
      <p
        v-if="error"
        class="text-red-500 text-center py-2"
      >
        {{ error }}
      </p>

      <LoginPageView 
        title="Iniciar Sesión (App)" 
        subtitle="Acceso de Usuario"
        :loading="isLoading"
        @login="handleLogin"
        @login-otp="handleLoginOtp"
        @back="handleBack"
      />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import { useRouter } from 'vue-router';
import { LoginPageView, useAuth, useAgents } from '@obai/shared';

const router = useRouter();
const { login, requestOtp, isLoading, error } = useAuth();
const { getMyAgent } = useAgents();

async function handleLogin(payload: { email: string; pass: string }) {
  try {
    await login(payload.email, payload.pass);
    await checkRedirect();
  } catch (e) {
    console.error('Error logueando en la app', e);
  }
}

async function handleLoginOtp(email: string) {
  try {
    await requestOtp(email);
    // Guardar email de respaldo
    localStorage.setItem('obai_pending_email', email);
    
    router.push({
      path: '/verify-otp',
      query: { email, type: 'magiclink' }
    });
  } catch (e) {
    console.error('Error solicitando OTP', e);
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
  router.push('/home');
}
</script>
