<script setup lang="ts">
import {
  MessageSquare,
  Settings,
  Zap,
} from 'lucide-vue-next';
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
import NavUser from './NavUser.vue';

const data = {
  user: {
    name: 'Usuario',
    email: 'user@obai.ai',
    avatar: '',
  },
  navMain: [
    {
      title: 'Chat con Obai',
      url: '/chat',
      icon: MessageSquare,
      isActive: true,
    },
    {
      title: 'Ajustes',
      url: '#',
      icon: Settings,
    },
  ],
};
</script>

<template>
  <Sidebar
    collapsible="icon"
    class="group/sidebar"
    v-bind="$attrs"
  >
    <SidebarHeader class="flex justify-center px-2 bg-sidebar pt-[var(--ion-safe-area-top,0px)] h-[calc(4rem+var(--ion-safe-area-top,0px))]">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            size="lg"
            class="pointer-events-none"
          >
            <div class="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
              <Zap class="size-4" />
            </div>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-bold text-base">Obai</span>
            </div>
          </SidebarMenuButton>
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
