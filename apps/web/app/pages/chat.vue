<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ChatPageView, useAgents } from '@obai/shared';
import { definePageMeta } from '#imports';

definePageMeta({
  middleware: ['auth']
});

const { getMyAgent } = useAgents();
const agentName = ref('Asistente');

onMounted(async () => {
  const agent = await getMyAgent();
  if (agent) {
    agentName.value = agent.name;
  }
});
</script>

<template>
  <ClientOnly>
    <ChatPageView>
      <template #title>
        {{ agentName }}
      </template>
    </ChatPageView>
  </ClientOnly>
</template>
