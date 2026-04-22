<script setup lang="ts">
import { BotSetupPageView, useAgents } from '@obai/shared';
import { useRouter, onMounted, ref } from '#imports';

definePageMeta({
  middleware: ['auth']
});

const router = useRouter();
const { getSuggestion, saveAgent, getMyAgent, isLoading, error } = useAgents();
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
  // Check if user already has an agent
  const existing = await getMyAgent();
  if (existing) {
    // If they have one, maybe we pre-fill it or just go to chat
    // The user wants the setup flow, so if they reached here, we show it
    currentAgent.value = existing;
  } else {
    await fetchNewSuggestion();
  }
});
</script>

<template>
  <main>
    <p
      v-if="error"
      class="fixed top-4 left-1/2 -translate-x-1/2 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-2 rounded-full backdrop-blur-md z-50"
    >
      {{ error }}
    </p>
    <ClientOnly>
      <BotSetupPageView 
        :initial-agent="currentAgent"
        :loading="isLoading"
        @save="handleSave"
        @regenerate="fetchNewSuggestion"
      />
    </ClientOnly>
  </main>
</template>
