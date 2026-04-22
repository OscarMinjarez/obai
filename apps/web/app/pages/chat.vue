<script setup lang="ts">
import { ChatPageView, Button } from '@obai/shared';
import { definePageMeta } from '#imports';

definePageMeta({
  middleware: ['auth']
});
</script>

<template>
  <main class="h-screen overflow-hidden">
    <ChatPageView>
      <template #actions>
        <Button variant="outline" size="sm" as-child>
          <NuxtLink to="/">Volver al inicio</NuxtLink>
        </Button>
      </template>
    </ChatPageView>
  </main>
</template>
