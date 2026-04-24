# Commands

A compact list of useful scripts available from the repo root (see `package.json`).

## Maintenance & Installation
- `npm run install:all` – Install dependencies for ALL projects in the monorepo (Root, Web, Mobile, Shared).

## Development
- `npm run dev:apis` – Run the backend APIs (client + admin) in watch mode using Webpack.
- `npm run dev:web` – Run the web frontend (Nuxt).
- `npm run dev:mobile` – Run the mobile app (Vite/Ionic).
- `npm run dev:all` – Run APIs + web + mobile concurrently.

## Quality & Testing
- `npm run test` – Run unit tests.
- `npm run format` – Run code formatters and linters.
- `npm run build` – Build all applications for production.

### Note on Backend Builds
Backend applications (`admin-api` and `client-api`) use Webpack to bundle all dependencies and library code into a single executable `main.js` file located in `dist/apps/{project}/src/`.
