export * from './interfaces/api-response.interface';
export { cn } from './lib/utils';
export * from './composables/useAuth';
export * from './composables/useAgents';
export * from './composables/useChat';

// Pages
export { default as BotSetupPageView } from './pages/BotSetupPageView.vue';
export { default as ChatPageView } from './pages/ChatPageView.vue';
export { default as LoginPageView } from './pages/LoginPageView.vue';
export { default as RegisterPageView } from './pages/RegisterPageView.vue';
export { default as VerifyOtpPageView } from './pages/VerifyOtpPageView.vue';

// UI Components
export { Button } from './components/ui/button';
export { Input } from './components/ui/input';
export { Textarea } from './components/ui/textarea';
export { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar';
export { ScrollArea, ScrollBar } from './components/ui/scroll-area';
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './components/ui/card';
export { SidebarProvider, Sidebar, SidebarTrigger, SidebarInset, SidebarContent, SidebarHeader, SidebarFooter, SidebarRail } from './components/ui/sidebar';
export { PinInput, PinInputGroup, PinInputSeparator, PinInputSlot } from './components/ui/pin-input';

// Layout components
export { default as AppSidebar } from './components/AppSidebar.vue';
