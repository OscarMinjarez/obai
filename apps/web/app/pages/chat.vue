<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ChatPageView, Button, useAgents } from '@obai/shared';
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
  <main class="h-screen overflow-hidden">
    <ChatPageView>
      <template #title>
        {{ agentName }}
      </template>
      <template #actions>
        <Button variant="ghost" size="sm" as-child>
          <NuxtLink to="/">Volver</NuxtLink>
        </Button>
      </template>
    </ChatPageView>
  </main>
</template>
