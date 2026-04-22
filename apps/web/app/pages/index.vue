<script setup lang="ts">
import { Button } from '@obai/shared/components/ui/button';
</script>

<template>
  <main class="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
    <div class="w-full max-w-sm space-y-8 text-center">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">
          Obai Web
        </h1>
        <p class="text-sm text-muted-foreground">
          Plataforma de pruebas y desarrollo.
        </p>
      </div>
      
      <div class="flex flex-col gap-3">
        <Button
          as-child
          class="h-10"
        >
          <NuxtLink to="/login">
            Ir a Login
          </NuxtLink>
        </Button>
        <Button
          variant="outline"
          as-child
          class="h-10"
        >
          <NuxtLink to="/register">
            Crear Cuenta
          </NuxtLink>
        </Button>
        <Button
          variant="secondary"
          as-child
          class="h-10"
        >
          <NuxtLink to="/chat">
            Ir al Chat
          </NuxtLink>
        </Button>
      </div>
    </div>
  </main>
</template>
