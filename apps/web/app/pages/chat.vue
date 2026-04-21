<script setup lang="ts">
import { Button } from '@obai/shared/components/ui/button';
</script>

<template>
  <main class="min-h-screen bg-background text-foreground">
    <div class="mx-auto flex min-h-screen max-w-2xl items-center px-6 py-12">
      <section class="w-full space-y-6 rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
        <div class="space-y-2">
          <p class="text-sm font-medium text-muted-foreground">Chat</p>
          <h1 class="text-3xl font-semibold tracking-tight">Conversation</h1>
          <p class="text-sm text-muted-foreground">A simple light view to verify shared styles and layout.</p>
        </div>

        <div class="space-y-3 rounded-lg border bg-background p-4">
          <div class="rounded-md bg-muted px-4 py-3 text-sm text-foreground">System: Welcome to Obai Chat!</div>
          <div class="ml-auto max-w-[80%] rounded-md bg-primary px-4 py-3 text-sm text-primary-foreground">User: testing shared styles</div>
        </div>

        <div class="space-y-3">
          <input type="text" placeholder="Type your message..." class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
          <div class="flex flex-col gap-3 sm:flex-row">
            <Button class="sm:w-28">Send</Button>
            <Button variant="outline" as-child>
              <NuxtLink to="/">Back</NuxtLink>
            </Button>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>
