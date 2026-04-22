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

// UI Components
export { Button } from './components/ui/button';
