# Troubleshooting

Common issues and how to resolve them.

## Import paths ending with `.ts`

If the editor reports: "An import path can only end with a '.ts' extension" — remove the `.ts` extension from imports. Example:

```ts
// bad
import { useAuth } from '@obai/shared/composables/useAuth.ts'

// good
import { useAuth } from '@obai/shared/composables/useAuth'
```

## `import.meta.env` typings

If TypeScript complains about `import.meta.env`, you can:

- Cast as `any`: `(import.meta as any).env.VITE_API_URL` (used in the shared composable for compatibility);
- Or include Vite types in your tsconfig for the apps that use Vite/Nuxt.

## Tailwind classes missing

Ensure each app's `tailwind.config.cjs` includes the shared paths:

```
'../../libs/shared/src/**/*.{vue,js,ts,jsx,tsx}'
```

## TypeScript deprecation warnings

To silence future TypeScript 7.0 deprecation warnings we set `ignoreDeprecations: "6.0"` in the root and `libs/shared` `tsconfig.json`. For a long-term fix, migrate `baseUrl`/moduleResolution settings to NodeNext/Node16 semantics.

## Nuxt transpilation of shared `.vue`

If Nuxt doesn't pick up `.vue` files in `libs/shared`, add the package path to `build.transpile` or ensure the alias points directly at `libs/shared/src` in `nuxt.config.ts`.
