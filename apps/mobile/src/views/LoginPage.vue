<template>
  <ion-page>
    <ion-content class="ion-padding bg-background text-foreground">
      <p v-if="error" class="text-red-500 text-center py-2">{{ error }}</p>
      <LoginPageView 
        title="Iniciar Sesión (App)" 
        subtitle="Acceso de Usuario"
        :loading="isLoading"
        @login="handleLogin"
        @back="handleBack"
      />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import { useRouter } from 'vue-router';
import LoginPageView from '@obai/shared/pages/LoginPageView.vue';
import { useAuth } from '@obai/shared/composables/useAuth';

const router = useRouter();
const { login, isLoading, error } = useAuth();

async function handleLogin(payload: { email: string; pass: string }) {
  try {
    await login(payload.email, payload.pass);
    router.push('/chat'); // o la ruta principal de la app
  } catch (e) {
    console.error('Error logueando en la app', e);
  }
}

function handleBack() {
  router.push('/home');
}
</script>
