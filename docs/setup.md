# Setup

Quick steps to get the repo running locally.

## Prerequisites

- Node.js (recommended >= 18)
- PostgreSQL (or use Supabase)

## Install

From the repository root:

```bash
npm install
```

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

See `docs/commands.md` for a full list of scripts.
