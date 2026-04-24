<script setup lang="ts">
import { ref, computed } from 'vue';
import { useForm } from 'vee-validate';
import { useI18n } from 'vue-i18n';
import { toTypedSchema } from '@vee-validate/zod';
import { loginSchema, otpRequestSchema } from '../schemas/auth.schema';
import { 
  Button, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage,
  Input,
  LanguageSwitcher
} from '../index';

defineProps<{
  title?: string;
  subtitle?: string;
  loading?: boolean;
}>();

const emit = defineEmits<{
  (e: 'login', payload: { email: string; pass: string }): void;
  (e: 'loginOtp', email: string): void;
  (e: 'back'): void;
}>();

const mode = ref<'password' | 'otp'>('password');

const { t } = useI18n();

const currentSchema = computed(() => {
  return mode.value === 'password' 
    ? toTypedSchema(loginSchema) 
    : toTypedSchema(otpRequestSchema);
});

const form = useForm<any>({
  validationSchema: currentSchema,
  initialValues: {
    email: '',
    password: '',
  },
});

const onSubmit = form.handleSubmit((values) => {
  if (mode.value === 'password') {
    emit('login', { email: values.email, pass: values.password });
  } else {
    emit('loginOtp', values.email);
  }
});

function toggleMode() {
  mode.value = mode.value === 'password' ? 'otp' : 'password';
  form.resetForm();
}
</script>

<template>
  <div class="flex min-h-screen w-full flex-col lg:flex-row relative">
    <!-- Language Switcher Corner -->
    <div class="absolute top-4 right-4 z-50">
      <LanguageSwitcher />
    </div>

    <!-- Form Side -->
    <div class="flex flex-1 items-center justify-center bg-background px-6 py-12 lg:px-12">
      <div class="w-full max-w-sm space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
        <div class="space-y-2 text-center lg:text-left">
          <h1 class="text-3xl font-bold tracking-tight">
            {{ title || (mode === 'password' ? t('auth.login.title_password') : t('auth.login.title_otp')) }}
          </h1>
          <p class="text-sm text-muted-foreground">
            {{ subtitle || (mode === 'password' ? t('auth.login.subtitle_password') : t('auth.login.subtitle_otp')) }}
          </p>
        </div>

        <form
          class="space-y-6"
          @submit="onSubmit"
        >
          <div class="space-y-4">
            <FormField
              v-slot="{ componentField }"
              name="email"
            >
              <FormItem>
                <FormLabel>{{ t('auth.login.email_label') }}</FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    :placeholder="t('auth.login.email_placeholder')" 
                    v-bind="componentField"
                    :disabled="loading"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            
            <FormField
              v-if="mode === 'password'"
              v-slot="{ componentField }"
              name="password"
            >
              <FormItem class="animate-in fade-in slide-in-from-top-2">
                <div class="flex items-center justify-between">
                  <FormLabel>{{ t('auth.login.password_label') }}</FormLabel>
                  <a
                    href="#"
                    class="text-xs text-muted-foreground hover:text-primary transition-colors"
                  >{{ t('auth.login.forgot_password') }}</a>
                </div>
                <FormControl>
                  <Input 
                    type="password" 
                    :placeholder="t('auth.login.password_placeholder')" 
                    v-bind="componentField"
                    :disabled="loading"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>

          <div class="flex flex-col gap-3">
            <Button
              type="submit"
              class="w-full h-10"
              :disabled="loading"
            >
              <span v-if="loading">{{ t('auth.login.loading') }}</span>
              <span v-else>{{ mode === 'password' ? t('auth.login.submit_password') : t('auth.login.submit_otp') }}</span>
            </Button>
            
            <Button
              variant="link"
              type="button"
              class="text-xs"
              @click="toggleMode"
            >
              {{ mode === 'password' ? t('auth.login.toggle_otp') : t('auth.login.toggle_password') }}
            </Button>

            <div class="relative py-4">
              <div class="absolute inset-0 flex items-center">
                <span class="w-full border-t" />
              </div>
              <div class="relative flex justify-center text-xs uppercase">
                <span class="bg-background px-2 text-muted-foreground">{{ t('auth.login.or_continue_with') }}</span>
              </div>
            </div>
            <Button
              variant="outline"
              type="button"
              class="w-full h-10"
              @click="$emit('back')"
            >
              {{ t('auth.login.back_home') }}
            </Button>
          </div>
        </form>

        <p class="px-8 text-center text-sm text-muted-foreground">
          {{ t('auth.login.terms_prefix') }} 
          <a
            href="#"
            class="underline underline-offset-4 hover:text-primary"
          >{{ t('auth.login.terms_link') }}</a> {{ t('auth.login.terms_and') }} 
          <a
            href="#"
            class="underline underline-offset-4 hover:text-primary"
          >{{ t('auth.login.privacy_link') }}</a>.
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
      <div class="absolute bottom-12 left-12 right-12 z-10">
        <blockquote class="space-y-2">
          <p class="text-lg font-medium text-white/90">
            "{{ t('auth.login.quote') }}"
          </p>
          <footer class="text-sm text-white/60">
            {{ t('auth.login.quote_footer') }}
          </footer>
        </blockquote>
      </div>
    </div>
  </div>
</template>
