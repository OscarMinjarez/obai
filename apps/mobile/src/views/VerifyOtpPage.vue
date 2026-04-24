<template>
  <ion-page>
    <ion-content class="ion-padding bg-background text-foreground">
      <div class="flex flex-col items-center justify-center min-h-full">
        <p
          v-if="error"
          class="text-red-500 text-center py-2"
        >
          {{ error }}
        </p>

        <VerifyOtpPageView 
          :email="String(route.query.email || '')"
          :type="(route.query.type as any) || 'signup'"
          @verified="onVerified"
        />
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import { useRouter, useRoute } from 'vue-router';
import { VerifyOtpPageView, useAuth, useAgents } from '@obai/shared';

const router = useRouter();
const route = useRoute();
const { error } = useAuth();
const { getMyAgent } = useAgents();

async function onVerified() {
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
</script>
