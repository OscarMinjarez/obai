<script setup lang="ts">
import { Button } from '@obai/shared/components/ui/button';
</script>

<template>
  <main class="min-h-screen bg-background text-foreground">
    <div class="mx-auto flex min-h-screen max-w-xl items-center px-6 py-12">
      <section class="w-full space-y-6 rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
        <div class="space-y-2">
          <p class="text-sm font-medium text-muted-foreground">Register</p>
          <h1 class="text-3xl font-semibold tracking-tight">Create account</h1>
          <p class="text-sm text-muted-foreground">The default shadcn-vue light theme is shared across the stack.</p>
        </div>
        <form class="space-y-4" @submit.prevent>
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none">Name</label>
            <input type="text" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" placeholder="Your name" />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none">Email</label>
            <input type="email" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" placeholder="you@example.com" />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none">Password</label>
            <input type="password" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" placeholder="Create a password" />
          </div>
          <div class="flex flex-col gap-3 sm:flex-row">
            <Button type="submit">Create account</Button>
            <Button variant="outline" as-child>
              <NuxtLink to="/">Back</NuxtLink>
            </Button>
          </div>
        </form>
      </section>
    </div>
  </main>
</template>
