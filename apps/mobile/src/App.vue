<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { useLocale } from '@obai/shared';

const { initLocale } = useLocale();

onMounted(() => {
  initLocale();
});
</script>
