<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { GalleryVerticalEnd } from "lucide-vue-next"
import {
  PinInput,
  PinInputGroup,
  PinInputSlot,
} from '../components/ui/pin-input';
import { Button } from '../components/ui/button';
import { useAuth } from '../composables/useAuth';
import { cn } from '../lib/utils';

const props = defineProps<{
  email: string;
  type?: 'signup' | 'signin' | 'magiclink';
}>();

const emit = defineEmits(['verified', 'resend']);

const value = ref<string[]>([]);
const { verifyOtp, requestOtp, isLoading, error } = useAuth();
const timer = ref(30);

// Usar el email del prop o buscar el de respaldo en localStorage
const effectiveEmail = ref(props.email);

onMounted(() => {
  startTimer();
  if (!effectiveEmail.value && typeof window !== 'undefined') {
    effectiveEmail.value = localStorage.getItem('obai_pending_email') || '';
  }
});

watch(() => props.email, (newEmail) => {
  if (newEmail) effectiveEmail.value = newEmail;
});

const handleComplete = async (e: string[]) => {
  const code = e.join('');
  if (code.length === 6) {
    if (!effectiveEmail.value) {
      console.error('No email found for verification');
      return;
    }
    try {
      await verifyOtp(effectiveEmail.value, code, props.type || 'signup');
      emit('verified');
      // Limpiar el respaldo tras éxito
      if (typeof window !== 'undefined') localStorage.removeItem('obai_pending_email');
    } catch (err) {
      console.error('OTP verification failed', err);
    }
  }
};

const resendOtp = async () => {
  if (timer.value > 0 || !effectiveEmail.value) return;
  try {
    await requestOtp(effectiveEmail.value);
    timer.value = 30;
    startTimer();
    emit('resend');
  } catch (err) {
    console.error('Resend OTP failed', err);
  }
};

const startTimer = () => {
  const interval = setInterval(() => {
    if (timer.value > 0) {
      timer.value--;
    } else {
      clearInterval(interval);
    }
  }, 1000);
};

onMounted(() => {
  startTimer();
});
</script>

<template>
  <div :class="cn('flex flex-col gap-6 w-full max-w-sm mx-auto', $attrs.class ?? '')">
    <div class="flex flex-col items-center gap-2 text-center">
      <a href="#" class="flex flex-col items-center gap-2 font-medium">
        <div class="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <GalleryVerticalEnd class="size-6" />
        </div>
        <span class="sr-only">Obai Inc.</span>
      </a>
      <h1 class="text-xl font-bold mt-2">
        Ingresa el código de verificación
      </h1>
      <p class="text-sm text-muted-foreground">
        Hemos enviado un código de 6 dígitos a <br>
        <span class="font-medium text-foreground">{{ effectiveEmail }}</span>
      </p>
    </div>

    <div class="grid gap-6">
      <div class="flex flex-col items-center gap-4">
        <PinInput
          id="otp"
          v-model="value"
          class="flex items-center gap-2 sm:gap-4"
          @complete="handleComplete"
        >
          <PinInputGroup class="gap-2 sm:gap-3 *:data-[slot=pin-input-slot]:h-14 *:data-[slot=pin-input-slot]:w-10 sm:*:data-[slot=pin-input-slot]:h-16 sm:*:data-[slot=pin-input-slot]:w-12 *:data-[slot=pin-input-slot]:rounded-md *:data-[slot=pin-input-slot]:border *:data-[slot=pin-input-slot]:text-xl">
            <PinInputSlot :index="0" />
            <PinInputSlot :index="1" />
            <PinInputSlot :index="2" />
          </PinInputGroup>
          
          <div class="flex items-center justify-center">
            <span class="text-2xl font-light text-muted-foreground/50">−</span>
          </div>

          <PinInputGroup class="gap-2 sm:gap-3 *:data-[slot=pin-input-slot]:h-14 *:data-[slot=pin-input-slot]:w-10 sm:*:data-[slot=pin-input-slot]:h-16 sm:*:data-[slot=pin-input-slot]:w-12 *:data-[slot=pin-input-slot]:rounded-md *:data-[slot=pin-input-slot]:border *:data-[slot=pin-input-slot]:text-xl">
            <PinInputSlot :index="3" />
            <PinInputSlot :index="4" />
            <PinInputSlot :index="5" />
          </PinInputGroup>
        </PinInput>
        
        <p v-if="error" class="text-xs text-destructive font-medium">{{ error }}</p>

        <p class="text-sm text-center text-muted-foreground mt-2">
          ¿No recibiste el código? 
          <button 
            class="text-primary hover:underline font-medium disabled:opacity-50"
            :disabled="timer > 0 || isLoading"
            @click="resendOtp"
          >
            {{ timer > 0 ? `Reenviar en ${timer}s` : 'Reenviar' }}
          </button>
        </p>
      </div>

      <Button 
        class="w-full h-11 text-base font-semibold"
        :disabled="value.length < 6 || isLoading"
        @click="handleComplete(value)"
      >
        {{ isLoading ? 'Verificando...' : 'Verificar' }}
      </Button>
    </div>

    <p class="px-6 text-center text-xs text-muted-foreground leading-relaxed">
      Al hacer clic en continuar, aceptas nuestros 
      <a href="#" class="underline underline-offset-4 hover:text-primary">Términos de Servicio</a>
      y 
      <a href="#" class="underline underline-offset-4 hover:text-primary">Política de Privacidad</a>.
    </p>
  </div>
</template>
