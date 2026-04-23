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
              {{ t('landing.mobile_title') }}
            </p>
            <h1 class="text-3xl font-semibold tracking-tight">
              {{ t('landing.welcome') }}
            </h1>
            <p class="text-sm text-muted-foreground">
              {{ t('landing.mobile_subtitle') }}
            </p>
          </div>

          <div class="flex flex-col gap-3">
            <Button as-child>
              <router-link to="/login">
                {{ t('landing.login') }}
              </router-link>
            </Button>
            <Button
              variant="outline"
              as-child
            >
              <router-link to="/register">
                {{ t('landing.register') }}
              </router-link>
            </Button>
            <Button
              variant="secondary"
              as-child
            >
              <router-link to="/chat">
                {{ t('landing.chat') }}
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
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>
