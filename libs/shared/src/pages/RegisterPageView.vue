<script setup lang="ts">
import { useForm } from 'vee-validate';
import { useI18n } from 'vue-i18n';
import { toTypedSchema } from '@vee-validate/zod';
import { registerSchema, type RegisterFormValues } from '../schemas/auth.schema';
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
  (e: 'register', payload: { name: string; email: string; pass: string }): void;
  (e: 'back'): void;
}>();

const { t } = useI18n();

const form = useForm<RegisterFormValues>({
  validationSchema: toTypedSchema(registerSchema),
  initialValues: {
    name: '',
    email: '',
    password: '',
  },
});

const onSubmit = form.handleSubmit((values) => {
  emit('register', { name: values.name, email: values.email, pass: values.password });
});
</script>

<template>
  <div class="flex min-h-screen w-full flex-col lg:flex-row relative">
    <!-- Language Switcher Corner -->
    <div class="absolute top-4 right-4 z-50">
      <LanguageSwitcher />
    </div>

    <!-- Image Side -->
    <div class="hidden lg:block lg:flex-1 relative bg-muted overflow-hidden order-last lg:order-first">
      <img 
        src="/auth-bg.png" 
        alt="Auth background" 
        class="absolute inset-0 h-full w-full object-cover brightness-[0.7] dark:brightness-[0.4]"
      >
      <div class="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
      <div class="absolute bottom-12 left-12 right-12 z-10 hidden xl:block">
        <blockquote class="space-y-2">
          <p class="text-lg font-medium text-white/90">
            "{{ t('auth.register.quote') }}"
          </p>
          <footer class="text-sm text-white/60">
            {{ t('auth.register.quote_footer') }}
          </footer>
        </blockquote>
      </div>
    </div>

    <!-- Form Side -->
    <div class="flex flex-1 items-center justify-center bg-background px-6 py-12 lg:px-12">
      <div class="w-full max-w-sm space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
        <div class="space-y-2 text-center lg:text-left">
          <h1 class="text-3xl font-bold tracking-tight">
            {{ title || t('auth.register.title') }}
          </h1>
          <p class="text-sm text-muted-foreground">
            {{ subtitle || t('auth.register.subtitle') }}
          </p>
        </div>

        <form
          class="space-y-6"
          @submit="onSubmit"
        >
          <div class="space-y-4">
            <FormField v-slot="{ componentField }" name="name">
              <FormItem>
                <FormLabel>{{ t('auth.register.name_label') }}</FormLabel>
                <FormControl>
                  <Input 
                    type="text" 
                    :placeholder="t('auth.register.name_placeholder')" 
                    v-bind="componentField"
                    :disabled="loading"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="email">
              <FormItem>
                <FormLabel>{{ t('auth.register.email_label') }}</FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    :placeholder="t('auth.register.email_placeholder')" 
                    v-bind="componentField"
                    :disabled="loading"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="password">
              <FormItem>
                <FormLabel>{{ t('auth.register.password_label') }}</FormLabel>
                <FormControl>
                  <Input 
                    type="password" 
                    :placeholder="t('auth.register.password_placeholder')" 
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
              <span v-if="loading">{{ t('auth.register.loading') }}</span>
              <span v-else>{{ t('auth.register.submit') }}</span>
            </Button>
            <Button
              variant="outline"
              type="button"
              class="w-full h-10"
              @click="$emit('back')"
            >
              {{ t('auth.register.back_login') }}
            </Button>
          </div>
        </form>

        <p class="px-8 text-center text-sm text-muted-foreground">
          {{ t('auth.register.terms_prefix') }} 
          <a
            href="#"
            class="underline underline-offset-4 hover:text-primary"
          >{{ t('auth.register.terms_link') }}</a>.
        </p>
      </div>
    </div>
  </div>
</template>
