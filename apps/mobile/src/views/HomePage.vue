<template>
  <ion-page>
    <ion-content
      :fullscreen="true"
      class="ion-padding"
    >
      <div class="mx-auto flex min-h-[100svh] max-w-md items-center">
        <section class="w-full space-y-6 rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
          <div class="space-y-2">
            <p class="text-sm font-medium text-muted-foreground">
              Obai Mobile
            </p>
            <h1 class="text-3xl font-semibold tracking-tight">
              Welcome
            </h1>
            <p class="text-sm text-muted-foreground">
              Default shadcn-vue light theme shared from the library.
            </p>
          </div>

          <div class="flex flex-col gap-3">
            <Button as-child>
              <router-link to="/login">
                Login
              </router-link>
            </Button>
            <Button
              variant="outline"
              as-child
            >
              <router-link to="/register">
                Register
              </router-link>
            </Button>
            <Button
              variant="secondary"
              as-child
            >
              <router-link to="/chat">
                Chat
              </router-link>
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
