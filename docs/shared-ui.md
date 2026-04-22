# Shared UI

The repository exposes a shared UI library used by both `apps/web` and `apps/mobile`.

- Location: `libs/shared`
  - Pages: `libs/shared/src/pages` (platform-agnostic page components)
  - Components: `libs/shared/src/components`
  - Assets: `libs/shared/src/assets`

## How to use

- Web (Nuxt): create thin wrappers under `apps/web/app/pages` that import and render the shared page component.
- Mobile (Ionic): create a `views` wrapper that imports the shared page and wraps it with `<ion-page>` / `<ion-content>`.

Example wrappers (already present in the repo):

- Web wrapper: `apps/web/app/pages/login.vue` imports `@obai/shared/pages/LoginPageView.vue` and calls `useAuth()`.
- Mobile wrapper: `apps/mobile/src/views/LoginPage.vue` imports the same `LoginPageView.vue` and wraps it in Ionic shell.

## Tailwind

Both apps include `libs/shared` paths in their `tailwind.config.cjs` `content` so classes used in shared components are preserved.

## Nuxt/Vite config

- Nuxt alias is configured in `apps/web/nuxt.config.ts` to point `@obai/shared` at `libs/shared/src`.
- If you use Nuxt, add `libs/shared` to `build.transpile` when required to ensure `.vue` files are processed.
