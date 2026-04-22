<script setup lang="ts">
import { ref } from 'vue';
import { Button } from '../components/ui/button';

defineProps<{
  title?: string;
  subtitle?: string;
  loading?: boolean;
}>();

const emit = defineEmits<{
  (e: 'login', payload: { email: string; pass: string }): void;
  (e: 'back'): void;
}>();

const email = ref('');
const password = ref('');

function handleSubmit() {
  emit('login', { email: email.value, pass: password.value });
}
</script>

<template>
  <div class="flex min-h-screen w-full flex-col lg:flex-row">
    <!-- Form Side -->
    <div class="flex flex-1 items-center justify-center bg-background px-6 py-12 lg:px-12">
      <div class="w-full max-w-sm space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
        <div class="space-y-2 text-center lg:text-left">
          <h1 class="text-3xl font-bold tracking-tight">
            {{ title || 'Entrar' }}
          </h1>
          <p class="text-sm text-muted-foreground">
            {{ subtitle || 'Introduce tus credenciales para continuar.' }}
          </p>
        </div>

        <form
          class="space-y-6"
          @submit.prevent="handleSubmit"
        >
          <div class="space-y-4">
            <div class="space-y-2">
              <label
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                for="email"
              >Email</label>
              <input 
                id="email"
                v-model="email" 
                type="email" 
                class="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" 
                placeholder="nombre@ejemplo.com" 
                required 
              >
            </div>
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <label
                  class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  for="password"
                >Contraseña</label>
                <a
                  href="#"
                  class="text-xs text-muted-foreground hover:text-primary transition-colors"
                >¿Olvidaste tu contraseña?</a>
              </div>
              <input 
                id="password"
                v-model="password" 
                type="password" 
                class="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" 
                placeholder="••••••••" 
                required 
              >
            </div>
          </div>

          <div class="flex flex-col gap-3">
            <Button
              type="submit"
              class="w-full h-10"
              :disabled="loading"
            >
              <span v-if="loading">Iniciando sesión...</span>
              <span v-else>Entrar</span>
            </Button>
            <div class="relative py-4">
              <div class="absolute inset-0 flex items-center">
                <span class="w-full border-t" />
              </div>
              <div class="relative flex justify-center text-xs uppercase">
                <span class="bg-background px-2 text-muted-foreground">O continúa con</span>
              </div>
            </div>
            <Button
              variant="outline"
              type="button"
              class="w-full h-10"
              @click="$emit('back')"
            >
              Volver al inicio
            </Button>
          </div>
        </form>

        <p class="px-8 text-center text-sm text-muted-foreground">
          Al hacer clic en continuar, aceptas nuestros 
          <a
            href="#"
            class="underline underline-offset-4 hover:text-primary"
          >Términos de Servicio</a> y 
          <a
            href="#"
            class="underline underline-offset-4 hover:text-primary"
          >Política de Privacidad</a>.
        </p>
      </div>
    </div>

    <!-- Image Side -->
    <div class="hidden lg:block lg:flex-1 relative bg-muted overflow-hidden">
      <img 
        src="/auth-bg.png" 
        alt="Auth background" 
        class="absolute inset-0 h-full w-full object-cover brightness-[0.7] dark:brightness-[0.4]"
      >
      <div class="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
      <div class="absolute bottom-12 left-12 right-12 z-20">
        <!-- <blockquote class="space-y-2">
          <p class="text-lg font-medium text-white italic">
            "Obai ha transformado la manera en que gestiono mi día a día. Es mucho más que un asistente, es un compañero inteligente."
          </p>
          <footer class="text-sm text-white/80">— Elena, tu compañera de Obai</footer>
        </blockquote> -->
      </div>
    </div>
  </div>
</template>
