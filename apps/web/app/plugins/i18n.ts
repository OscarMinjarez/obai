import { defineNuxtPlugin } from '#app';
import { i18n } from '@obai/shared';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(i18n);
});
