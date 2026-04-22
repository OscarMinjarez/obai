<template>
  <ion-page>
    <ion-content>
      <BotSetupPageView 
        :initial-agent="currentAgent"
        :loading="isLoading"
        @save="handleSave"
        @regenerate="fetchNewSuggestion"
      />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import { BotSetupPageView, useAgents } from '@obai/shared';
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';

const router = useRouter();
const { getSuggestion, saveAgent, getMyAgent, isLoading } = useAgents();
const currentAgent = ref<any>(null);

async function fetchNewSuggestion() {
  try {
    currentAgent.value = await getSuggestion();
  } catch (e) {
    console.error('Error fetching suggestion', e);
  }
}

async function handleSave(agentData: any) {
  try {
    await saveAgent(agentData);
    router.push('/chat');
  } catch (e) {
    console.error('Error saving agent', e);
  }
}

onMounted(async () => {
  const existing = await getMyAgent();
  if (existing) {
    currentAgent.value = existing;
  } else {
    await fetchNewSuggestion();
  }
});
</script>
