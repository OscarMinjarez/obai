<script setup lang="ts">
import { VerifyOtpPageView, useAuth, useAgents } from '@obai/shared';
import { useRouter, useRoute } from '#imports';
import { computed } from 'vue';

const router = useRouter();
const route = useRoute();
const { error } = useAuth();
const { getMyAgent } = useAgents();

const email = computed(() => (route.query.email as string) || '');
const type = computed(() => (route.query.type as 'signup' | 'signin' | 'magiclink') || 'signup');

async function onVerified() {
  try {
    const agent = await getMyAgent();
    if (agent) {
      router.push('/chat');
    } else {
      router.push('/onboarding');
    }
  } catch {
    router.push('/onboarding');
  }
}
</script>

<template>
  <div class="relative min-h-screen flex items-center justify-center">
    <!-- Floating error indicator -->
    <p
      v-if="error"
      class="fixed top-6 left-1/2 -translate-x-1/2 z-[60] bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-2 rounded-full text-xs font-bold backdrop-blur-md animate-in fade-in slide-in-from-top-4"
    >
      {{ error }}
    </p>

    <ClientOnly>
      <VerifyOtpPageView 
        :email="String(route.query.email || '')"
        :type="(route.query.type as any) || 'signup'"
        @verified="onVerified"
      />
    </ClientOnly>
  </div>
</template>
