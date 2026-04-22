# Commands

A compact list of useful scripts available from the repo root (see `package.json`).

- `npm run dev:apis` — Run the backend APIs (client + admin) in watch mode.
- `npm run dev:web` — Run the web frontend (Nuxt).
- `npm run dev:mobile` — Run the mobile app (Expo/Ionic/Vite).
- `npm run dev:all` — Run APIs + web + mobile concurrently.
- `npm run test` — Run unit tests.
- `npm run format` — Run code formatters and linters.

Examples:

```bash
# Run client-api only
npm run dev --prefix apps/client-api

# Run web and mobile at the same time
npm run dev:web & npm run dev:mobile
```
