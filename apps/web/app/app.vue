<script setup lang="ts">
import { onMounted } from 'vue';
import { useLocale } from '@obai/shared';

const { initLocale } = useLocale();

onMounted(() => {
  initLocale();
});
</script>

<template>
  <div>
    <NuxtPage />
  </div>
</template>
