<script setup lang="ts">
import { Button } from '@obai/shared/components/ui/button';
</script>

<template>
  <main class="min-h-screen bg-background text-foreground">
    <div class="mx-auto flex min-h-screen max-w-xl items-center px-6 py-12">
      <section class="w-full space-y-6 rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
        <div class="space-y-2">
          <p class="text-sm font-medium text-muted-foreground">Obai Web</p>
          <h1 class="text-3xl font-semibold tracking-tight">Welcome</h1>
          <p class="text-sm text-muted-foreground">Default shadcn-vue light theme, shared from the monorepo library.</p>
        </div>
        <div class="flex flex-col gap-3 sm:flex-row">
          <Button as-child>
            <NuxtLink to="/login">Login</NuxtLink>
          </Button>
          <Button variant="outline" as-child>
            <NuxtLink to="/register">Register</NuxtLink>
          </Button>
          <Button variant="secondary" as-child>
            <NuxtLink to="/chat">Chat</NuxtLink>
          </Button>
        </div>
      </section>
    </div>
  </main>
</template>
