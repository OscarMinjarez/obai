<template>
  <ion-page>
    <ion-content>
      <ChatPageView>
        <template #title>
          {{ agentName }}
        </template>
        <template #actions>
          <Button variant="ghost" size="icon" as-child>
            <router-link to="/home">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </router-link>
          </Button>
        </template>
      </ChatPageView>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { IonContent, IonPage } from '@ionic/vue';
import { ChatPageView, Button, useAgents } from '@obai/shared';

const { getMyAgent } = useAgents();
const agentName = ref('Asistente');

onMounted(async () => {
  const agent = await getMyAgent();
  if (agent) {
    agentName.value = agent.name;
  }
});
</script>
