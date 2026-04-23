<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from './ui/sidebar';
import { Folder, Forward, MoreHorizontal, Trash2, type LucideIcon } from 'lucide-vue-next';
import { useI18n } from 'vue-i18n';

defineProps<{
  projects: {
    name: string
    url: string
    icon: LucideIcon
  }[]
}>();

const { isMobile } = useSidebar();
const { t } = useI18n();
</script>

<template>
  <SidebarGroup class="group-data-[collapsible=icon]:hidden">
    <SidebarGroupLabel>{{ t('sidebar.projects') }}</SidebarGroupLabel>
    <SidebarMenu>
      <SidebarMenuItem
        v-for="item in projects"
        :key="item.name"
      >
        <SidebarMenuButton as-child>
          <a :href="item.url">
            <component :is="item.icon" />
            <span>{{ item.name }}</span>
          </a>
        </SidebarMenuButton>
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <SidebarMenuAction show-on-hover>
              <MoreHorizontal />
              <span class="sr-only">{{ t('common.more') }}</span>
            </SidebarMenuAction>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            class="w-48 rounded-lg"
            :side="isMobile ? 'bottom' : 'right'"
            :align="isMobile ? 'end' : 'start'"
          >
            <DropdownMenuItem>
              <Folder class="text-muted-foreground" />
              <span>{{ t('sidebar.view_project') }}</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Forward class="text-muted-foreground" />
              <span>{{ t('sidebar.share_project') }}</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Trash2 class="text-muted-foreground" />
              <span>{{ t('sidebar.delete_project') }}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton class="text-sidebar-foreground/70">
          <MoreHorizontal class="text-sidebar-foreground/70" />
          <span>{{ t('common.more') }}</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarGroup>
</template>
