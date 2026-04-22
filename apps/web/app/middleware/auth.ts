import { defineNuxtRouteMiddleware, navigateTo } from '#imports';
import { useAuth } from '@obai/shared/composables/useAuth';

export default defineNuxtRouteMiddleware((_to, _from) => {
  if (process.server) return;

  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated()) {
    return navigateTo('/login');
  }
});
