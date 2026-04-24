# Setup

Quick steps to get the repo running locally.

## Prerequisites

- Node.js (recommended >= 18)
- PostgreSQL (or use Supabase)

## Install

From the repository root, you can install the dependencies for all projects (APIs, Web, Mobile, and Shared Libs) in one step:

```bash
npm run install:all
```

This command ensures that each sub-project's `node_modules` are correctly populated and any post-install hooks (like Nuxt prepare) are executed.

## Environment

Create `.env` files for the services that require runtime configuration.

- `VITE_API_URL` should point to the client API base (e.g. `http://localhost:8000/api`).
  - Add to `apps/web/.env` and `apps/mobile/.env` if you run apps individually.

## Run (development)

From repo root you can run the most common workflows:

```bash
# Run only the APIs (client + admin)
npm run dev:apis

# Run web UI
npm run dev:web

# Run mobile app
npm run dev:mobile

# Run everything (apis + web + mobile)
npm run dev:all
```

### Build Architecture Notes
The backend APIs now use **Webpack** via the NestJS CLI. This provides:
- Automatic path alias resolution (`obai/*` and `generated/prisma`).
- Single bundle generation in `dist/` per application.
- CommonJS compatibility for stable runtime execution.

See `docs/commands.md` for a full list of scripts.
