<template>
  <ion-page class="obai-page">
    <ChatPageView>
      <template #title>
        {{ agentName }}
      </template>
    </ChatPageView>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { IonPage } from '@ionic/vue';
import { ChatPageView, useAgents } from '@obai/shared';

const { getMyAgent } = useAgents();
const agentName = ref('Asistente');

onMounted(async () => {
  const agent = await getMyAgent();
  if (agent) {
    agentName.value = agent.name;
  }
});
</script>

<style>
/*
 * Neutralizamos la interferencia de Ionic con el layout de shadcn.
 * Usamos selectores globales porque el Sheet/Dialog portal
 * se teleporta fuera del scope del componente.
 */

/* 1. Forzar ion-page a comportarse como un contenedor block normal */
.obai-page {
  display: block !important;
  position: relative !important;
  contain: none !important;
}

/* 2. El SidebarProvider y ChatPageView necesitan ocupar toda la pantalla */
.obai-page > .sidebar-provider,
.obai-page [data-slot="sidebar-provider"] {
  height: 100vh;
  width: 100%;
}

/* 3. Asegurar que el Sheet overlay de shadcn esté sobre las capas de Ionic */
[data-radix-dialog-overlay],
[data-reka-dialog-overlay] {
  z-index: 10000 !important;
}

[data-radix-dialog-content],
[data-reka-dialog-content] {
  z-index: 10001 !important;
}

/* 4. Evitar que Ionic resetee el background del Sheet */
ion-app [role="dialog"] {
  background-color: hsl(var(--sidebar-background)) !important;
}
</style>
