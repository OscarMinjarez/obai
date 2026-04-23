<script setup lang="ts">
import { ref } from 'vue';
import { Button } from '../components/ui/button';

defineProps<{
  title?: string;
  subtitle?: string;
  loading?: boolean;
}>();

const emit = defineEmits<{
  (e: 'register', payload: { name: string; email: string; pass: string }): void;
  (e: 'back'): void;
}>();

const name = ref('');
const email = ref('');
const password = ref('');

function handleSubmit() {
  emit('register', { name: name.value, email: email.value, pass: password.value });
}
</script>

<template>
  <div class="flex min-h-screen w-full flex-col lg:flex-row">
    <!-- Image Side -->
    <div class="hidden lg:block lg:flex-1 relative bg-muted overflow-hidden order-last lg:order-first">
      <img 
        src="/auth-bg.png" 
        alt="Auth background" 
        class="absolute inset-0 h-full w-full object-cover brightness-[0.7] dark:brightness-[0.4]"
      >
      <div class="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
    </div>

    <!-- Form Side -->
    <div class="flex flex-1 items-center justify-center bg-background px-6 py-12 lg:px-12">
      <div class="w-full max-w-sm space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
        <div class="space-y-2 text-center lg:text-left">
          <h1 class="text-3xl font-bold tracking-tight">
            {{ title || 'Crear cuenta' }}
          </h1>
          <p class="text-sm text-muted-foreground">
            {{ subtitle || 'Comienza tu viaje con Obai hoy mismo.' }}
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
                for="name"
              >Nombre completo</label>
              <input 
                id="name"
                v-model="name" 
                type="text" 
                class="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" 
                placeholder="Tu nombre" 
                required 
              >
            </div>
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
              <label
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                for="password"
              >Contraseña</label>
              <input 
                id="password"
                v-model="password" 
                type="password" 
                class="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" 
                placeholder="Mínimo 8 caracteres" 
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
              <span v-if="loading">Creando cuenta...</span>
              <span v-else>Registrarse</span>
            </Button>
            <Button
              variant="outline"
              type="button"
              class="w-full h-10"
              @click="$emit('back')"
            >
              Ya tengo cuenta
            </Button>
          </div>
        </form>

        <p class="px-8 text-center text-sm text-muted-foreground">
          Al registrarte, confirmas que has leído y aceptas nuestros 
          <a
            href="#"
            class="underline underline-offset-4 hover:text-primary"
          >Términos</a>.
        </p>
      </div>
    </div>
  </div>
</template>
