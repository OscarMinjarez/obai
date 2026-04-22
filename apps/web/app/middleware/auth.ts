import { defineNuxtRouteMiddleware, navigateTo } from '#imports';
import { useAuth } from '@obai/shared/composables/useAuth';

export default defineNuxtRouteMiddleware((to, from) => {
  if (process.server) return;

  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated()) {
    return navigateTo('/login');
  }
});
