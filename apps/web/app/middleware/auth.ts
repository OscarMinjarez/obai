import { defineNuxtRouteMiddleware, navigateTo } from '#imports';
import { useAuth } from '@obai/shared/composables/useAuth';

export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated()) {
    // Si no está autenticado, redirigir al login
    return navigateTo('/login');
  }
});
