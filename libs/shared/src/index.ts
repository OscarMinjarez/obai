export * from './interfaces/api-response.interface';
export { cn } from './lib/utils';
export * from './composables/useAuth';
export * from './composables/useAgents';
export * from './composables/useChat';
export * from './composables/useLocale';
export { default as i18n } from './plugins/i18n';

// Pages
export { default as BotSetupPageView } from './pages/BotSetupPageView.vue';
export { default as ChatPageView } from './pages/ChatPageView.vue';
export { default as LoginPageView } from './pages/LoginPageView.vue';
export { default as RegisterPageView } from './pages/RegisterPageView.vue';
export { default as VerifyOtpPageView } from './pages/VerifyOtpPageView.vue';

// UI Components
export { Button } from './components/ui/button';
export { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from './components/ui/form';
export { Label } from './components/ui/label';
export { Input } from './components/ui/input';
export { Textarea } from './components/ui/textarea';
export { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar';
export { ScrollArea, ScrollBar } from './components/ui/scroll-area';
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './components/ui/card';
export { SidebarProvider, Sidebar, SidebarTrigger, SidebarInset, SidebarContent, SidebarHeader, SidebarFooter, SidebarRail } from './components/ui/sidebar';
export { PinInput, PinInputGroup, PinInputSeparator, PinInputSlot } from './components/ui/pin-input';
export { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuGroup, 
  DropdownMenuSub, 
  DropdownMenuSubTrigger, 
  DropdownMenuSubContent, 
  DropdownMenuCheckboxItem, 
  DropdownMenuRadioGroup, 
  DropdownMenuRadioItem, 
  DropdownMenuShortcut 
} from './components/ui/dropdown-menu';

// Layout components
export { default as AppSidebar } from './components/AppSidebar.vue';
export { default as LanguageSwitcher } from './components/LanguageSwitcher.vue';
export { default as NavUser } from './components/NavUser.vue';
export { default as NavMain } from './components/NavMain.vue';
export { default as NavProjects } from './components/NavProjects.vue';
export { default as TeamSwitcher } from './components/TeamSwitcher.vue';
