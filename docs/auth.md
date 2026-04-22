# Authentication (shared)

Auth is implemented as a shared composable so both web and mobile can reuse the logic.

- Composable: `libs/shared/src/composables/useAuth.ts`
  - Exposes: `login(email, password)`, `register(name, email, password)`, `logout()`, `isAuthenticated()`, `user`, `token`, `isLoading`, `error`.
  - Reads `VITE_API_URL` (e.g. `http://localhost:8000/api`) to call the backend endpoints.

## Backend endpoints

- `POST /api/auth/register` — register a new user
- `POST /api/auth/login` — login and return access token + user

## Routing and guards

- Web (Nuxt): `apps/web/app/middleware/auth.ts` uses the shared composable to enforce authentication on pages via `definePageMeta({ middleware: ['auth'] })`.
- Mobile (Ionic): `apps/mobile/src/router/index.ts` adds `meta: { requiresAuth: true }` to protected routes and a `router.beforeEach` that calls `isAuthenticated()`.

## Usage example (pseudo)

```vue
<!-- apps/web/app/pages/login.vue -->
<script setup>
import LoginPageView from '@obai/shared/pages/LoginPageView.vue'
import { useAuth } from '@obai/shared/composables/useAuth'
const { login, isLoading, error } = useAuth()
function onLogin(payload) { await login(payload.email, payload.pass) }
</script>
```

Keep tokens in a secure store (localStorage is used by default in the composable for quick setup).
