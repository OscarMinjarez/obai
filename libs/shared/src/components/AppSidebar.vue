<script setup lang="ts">
import { computed } from 'vue';
import {
  MessageSquare,
  Settings,
  Zap,
} from 'lucide-vue-next';
import { useI18n } from 'vue-i18n';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarRail,
} from './ui/sidebar';
import { useAuth } from '../composables/useAuth';
import NavUser from './NavUser.vue';
import LanguageSwitcher from './LanguageSwitcher.vue';

const { user: authUser } = useAuth();

const { t } = useI18n();

const data = computed(() => ({
  user: {
    name: authUser.value?.name || 'Usuario',
    email: authUser.value?.email || 'user@obai.ai',
    avatar: authUser.value?.avatar || '',
  },
  navMain: [
    {
      title: t('sidebar.chat_link'),
      url: '/chat',
      icon: MessageSquare,
      isActive: true,
    },
    {
      title: t('sidebar.settings_link'),
      url: '#',
      icon: Settings,
    },
  ],
}));
</script>

<template>
  <Sidebar
    collapsible="icon"
    class="group/sidebar"
    v-bind="$attrs"
  >
    <SidebarHeader class="flex justify-center px-2 bg-sidebar pt-[var(--ion-safe-area-top,0px)] h-[calc(4rem+var(--ion-safe-area-top,0px))]">
      <SidebarMenu>
        <SidebarMenuItem class="flex items-center justify-between gap-2">
          <SidebarMenuButton
            size="lg"
            class="pointer-events-none flex-1"
          >
            <div class="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
              <Zap class="size-4" />
            </div>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-bold text-base">{{ t('sidebar.nav_title') }}</span>
            </div>
          </SidebarMenuButton>
          
          <!-- Language Switcher -->
          <div class="flex items-center pr-2">
            <LanguageSwitcher />
          </div>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarMenu>
          <SidebarMenuItem
            v-for="item in data.navMain"
            :key="item.title"
          >
            <SidebarMenuButton
              :tooltip="item.title"
              :active="item.isActive"
              as-child
            >
              <a :href="item.url">
                <component :is="item.icon" />
                <span>{{ item.title }}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <NavUser :user="data.user" />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
