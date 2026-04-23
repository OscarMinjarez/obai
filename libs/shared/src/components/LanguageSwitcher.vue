<script setup lang="ts">
import { Languages } from 'lucide-vue-next';
import { useLocale } from '../composables/useLocale';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';

const { currentLocale, setLocale } = useLocale();

const languages = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'ko', label: '한국어', flag: '🇰🇷' },
] as const;

function handleSetLocale(code: 'en' | 'es' | 'ko') {
  setLocale(code);
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" size="icon" class="w-9 h-9 rounded-full">
        <Languages class="h-[1.2rem] w-[1.2rem]" />
        <span class="sr-only">Toggle language</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="w-40">
      <DropdownMenuItem
        v-for="lang in languages"
        :key="lang.code"
        class="flex items-center justify-between cursor-pointer"
        :class="{ 'bg-accent text-accent-foreground': currentLocale === lang.code }"
        @click="handleSetLocale(lang.code)"
      >
        <span>{{ lang.label }}</span>
        <span class="text-lg">{{ lang.flag }}</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
