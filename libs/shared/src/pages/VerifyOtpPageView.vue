<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { GalleryVerticalEnd } from "lucide-vue-next";
import { useForm } from 'vee-validate';
import { useI18n } from 'vue-i18n';
import { toTypedSchema } from '@vee-validate/zod';
import { verifyOtpSchema } from '../schemas/auth.schema';
import {
  PinInput,
  PinInputGroup,
  PinInputSlot,
  Button,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField
} from '../index';
import { useAuth } from '../composables/useAuth';
import { cn } from '../lib/utils';

const props = defineProps<{
  email: string;
  type?: 'signup' | 'signin' | 'magiclink';
}>();

const emit = defineEmits(['verified', 'resend']);

const { verifyOtp, requestOtp, isLoading, error: apiError } = useAuth();
const { t } = useI18n();
const timer = ref(30);

// Usar el email del prop o buscar el de respaldo en localStorage
const effectiveEmail = ref(props.email);

const form = useForm({
  validationSchema: toTypedSchema(verifyOtpSchema),
  initialValues: {
    otp: '',
  },
});

onMounted(() => {
  startTimer();
  if (!effectiveEmail.value && typeof window !== 'undefined') {
    effectiveEmail.value = localStorage.getItem('obai_pending_email') || '';
  }
});

watch(() => props.email, (newEmail) => {
  if (newEmail) effectiveEmail.value = newEmail;
});

const handleComplete = async (otpValue: string) => {
  if (otpValue.length === 6) {
    if (!effectiveEmail.value) {
      console.error('No email found for verification');
      return;
    }
    try {
      await verifyOtp(effectiveEmail.value, otpValue, props.type || 'signup');
      emit('verified');
      if (typeof window !== 'undefined') localStorage.removeItem('obai_pending_email');
    } catch (err) {
      console.error('OTP verification failed', err);
    }
  }
};

const onSubmit = form.handleSubmit((values) => {
  handleComplete(values.otp);
});

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
</script>

<template>
  <div :class="cn('flex flex-col gap-8 w-full max-w-sm mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500', $attrs.class ?? '')">
    <div class="flex flex-col items-center gap-2 text-center">
      <div class="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 mb-2">
        <GalleryVerticalEnd class="size-6" />
      </div>
      <h1 class="text-2xl font-bold tracking-tight">
        {{ t('auth.verify.title') }}
      </h1>
      <p class="text-sm text-muted-foreground">
        {{ t('auth.verify.subtitle') }} <br>
        <span class="font-medium text-foreground">{{ effectiveEmail }}</span>
      </p>
    </div>

    <form
      class="grid gap-6"
      @submit="onSubmit"
    >
      <FormField
        v-slot="{ value, handleChange }"
        name="otp"
      >
        <FormItem class="flex flex-col items-center gap-4">
          <FormLabel class="sr-only">
            {{ t('auth.verify.otp_label') }}
          </FormLabel>
          <FormControl>
            <PinInput
              id="otp"
              :model-value="typeof value === 'string' ? value.split('') : []"
              class="flex items-center gap-2 sm:gap-4"
              placeholder="○"
              @update:model-value="(val) => handleChange(val.join(''))"
              @complete="(val) => handleComplete(val.join(''))"
            >
              <PinInputGroup class="gap-2 sm:gap-3">
                <PinInputSlot 
                  v-for="index in [0, 1, 2]" 
                  :key="index" 
                  :index="index"
                  class="h-14 w-10 sm:h-16 sm:w-12 rounded-lg border-2 text-xl font-bold transition-all focus:border-primary"
                />
              </PinInputGroup>
              
              <div class="flex items-center justify-center">
                <span class="text-2xl font-light text-muted-foreground/30">−</span>
              </div>

              <PinInputGroup class="gap-2 sm:gap-3">
                <PinInputSlot 
                  v-for="index in [3, 4, 5]" 
                  :key="index" 
                  :index="index"
                  class="h-14 w-10 sm:h-16 sm:w-12 rounded-lg border-2 text-xl font-bold transition-all focus:border-primary"
                />
              </PinInputGroup>
            </PinInput>
          </FormControl>
          <FormMessage />
          <p
            v-if="apiError"
            class="text-xs text-destructive font-medium animate-in shake duration-300"
          >
            {{ apiError }}
          </p>
        </FormItem>
      </FormField>

      <div class="space-y-4">
        <Button 
          type="submit"
          class="w-full h-11 text-base font-semibold shadow-sm"
          :disabled="(form.values.otp?.length ?? 0) < 6 || isLoading"
        >
          {{ isLoading ? t('auth.verify.verifying') : t('auth.verify.verify_button') }}
        </Button>

        <p class="text-sm text-center text-muted-foreground">
          {{ t('auth.verify.no_code') }} 
          <button 
            type="button"
            class="text-primary hover:underline font-medium disabled:opacity-50 transition-opacity"
            :disabled="timer > 0 || isLoading"
            @click="resendOtp"
          >
            {{ timer > 0 ? `${t('auth.verify.resend_prefix')} ${timer}s` : t('auth.verify.resend_button') }}
          </button>
        </p>
      </div>
    </form>

    <p class="px-6 text-center text-xs text-muted-foreground leading-relaxed">
      {{ t('auth.verify.terms_prefix') }} 
      <a
        href="#"
        class="underline underline-offset-4 hover:text-primary"
      >{{ t('auth.verify.terms_link') }}</a>
      {{ t('auth.login.terms_and') }} 
      <a
        href="#"
        class="underline underline-offset-4 hover:text-primary"
      >{{ t('auth.verify.privacy_link') }}</a>.
    </p>
  </div>
</template>
