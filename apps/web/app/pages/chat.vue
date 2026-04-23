<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ChatPageView, useAgents } from '@obai/shared';
import { definePageMeta } from '#imports';
import { useI18n } from 'vue-i18n';

definePageMeta({
  middleware: ['auth']
});

const { t } = useI18n();
const { getMyAgent } = useAgents();
const agentName = ref(t('chat.title'));

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
