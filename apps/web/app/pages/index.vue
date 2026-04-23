<script setup lang="ts">
import { Button } from '@obai/shared/components/ui/button';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <main class="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
    <div class="w-full max-w-sm space-y-8 text-center">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">
          {{ t('landing.title') }}
        </h1>
        <p class="text-sm text-muted-foreground">
          {{ t('landing.subtitle') }}
        </p>
      </div>
      
      <div class="flex flex-col gap-3">
        <Button
          as-child
          class="h-10"
        >
          <NuxtLink to="/login">
            {{ t('landing.go_to_login') }}
          </NuxtLink>
        </Button>
        <Button
          variant="outline"
          as-child
          class="h-10"
        >
          <NuxtLink to="/register">
            {{ t('landing.create_account') }}
          </NuxtLink>
        </Button>
        <Button
          variant="secondary"
          as-child
          class="h-10"
        >
          <NuxtLink to="/chat">
            {{ t('landing.go_to_chat') }}
          </NuxtLink>
        </Button>
      </div>
    </div>
  </main>
</template>
