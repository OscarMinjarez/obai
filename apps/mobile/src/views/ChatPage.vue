<template>
  <ion-page>
    <ion-content class="ion-padding">
      <div class="mx-auto flex min-h-[100svh] max-w-md items-center">
        <section class="w-full space-y-6 rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
          <div class="space-y-2">
            <p class="text-sm font-medium text-muted-foreground">Chat</p>
            <h1 class="text-3xl font-semibold tracking-tight">Conversation</h1>
            <p class="text-sm text-muted-foreground">Default light shadcn-vue theme with a minimal message list.</p>
          </div>

          <div class="space-y-3 rounded-lg border bg-background p-4">
            <div class="rounded-md bg-muted px-4 py-3 text-sm text-foreground">System: Welcome to Obai Chat!</div>
            <div class="ml-auto max-w-[80%] rounded-md bg-primary px-4 py-3 text-sm text-primary-foreground">User: testing shared styles</div>
          </div>

          <div class="space-y-3">
            <input type="text" placeholder="Type your message..." class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
            <Button class="w-full">Send</Button>
            <Button variant="outline" class="w-full" as-child>
              <router-link to="/home">Back</router-link>
            </Button>
          </div>
        </section>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import { Button } from '@obai/shared/components/ui/button';
</script>
