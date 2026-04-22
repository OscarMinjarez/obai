# Overview

Obai is an ambient, multi-device AI companion that runs across web, mobile and embedded devices.

## Vision

- **Context-Aware Presence:** Device heartbeats let Obai know which device you're using and what context matters.
- **Personality-Driven Proactivity:** Obai can proactively surface suggestions based on personality traits.
- **Spontaneous Sockets:** Real-time sockets enable spontaneous, cross-device nudges and proactivity.

## System Architecture

The repository is a monorepo organized around services and shared libraries:

- `apps/admin-api` — Administration, telemetry and moderation (Port 8001).
- `apps/client-api` — Primary API and realtime gateway (Port 8000).
- `apps/web` — Nuxt.js web client and admin UI.
- `apps/mobile` — Mobile app (Ionic / Vite / Expo) providing sensors and mobile UI.
- `libs/*` — Shared libraries: `messaging`, `entities`, `intelligence`, `shared` (UI + composables), etc.

## Tech Stack

- Framework: NestJS for backend services.
- Database: PostgreSQL (Supabase).
- ORM: Prisma 7.

Refer to the other docs for setup, development conventions and shared UI details.
