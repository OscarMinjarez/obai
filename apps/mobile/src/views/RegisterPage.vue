<template>
  <ion-page>
    <ion-content class="ion-padding bg-background text-foreground">
      <p
        v-if="error"
        class="text-red-500 text-center py-2"
      >
        {{ error }}
      </p>
      <RegisterPageView 
        title="Crear Cuenta" 
        subtitle="Regístrate en App"
        :loading="isLoading"
        @register="handleRegister"
        @back="handleBack"
      />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import { useRouter } from 'vue-router';
import RegisterPageView from '@obai/shared/pages/RegisterPageView.vue';
import { useAuth } from '@obai/shared/composables/useAuth';

const router = useRouter();
const { register, isLoading, error } = useAuth();

async function handleRegister(payload: { name: string; email: string; pass: string }) {
  try {
    await register(payload.name, payload.email, payload.pass);
    router.push('/login');
  } catch (e) {
    console.error('Error registrando en la app', e);
  }
}

function handleBack() {
  router.push('/home'); // O '/' principal
}
</script>
