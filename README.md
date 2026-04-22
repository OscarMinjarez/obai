# Obai - The Ubiquitous AI Companion

Obai is not a standard chatbot or a B2B SaaS. **Obai is true Ambient Artificial Intelligence** — a proactive, deeply personal companion that travels with you across your devices (Phone, PC, Tablet, IoT). 

Unlike traditional AIs where *you* initiate the conversation, Obai lives in the background of your life. It understands your context silently: it knows your location, the current weather, and the device you are currently paying attention to. 

**The Obai Vision:**
- **Context-Aware Presence:** Through device _heartbeats_, Obai knows if you are walking outside with your phone or sitting at your work PC. 
- **Personality-Driven Proactivity:** Obai doesn't just answer questions; it initiates them. If it rains, a "fearful" Obai might suggest taking shelter in a nearby café, while a "brave" Obai might suggest an adventure. 
- **Spontaneous Sockets:** Powered by real-time WebSockets, Obai taps you on the shoulder spontaneously across devices, asking if it can help with a meeting just as you log into your desktop. 

## 🏗️ System Architecture

The project is structured as a monorepo using **NestJS**, heavily optimized for real-time telemetry and Agent memory:

- **`apps/admin-api`** (Port 8001) — **The Control Center**: Designed for instance administrators and open-source self-hosters. It acts as the "God View" telemetry system to monitor Gemini token consumption, active WebSocket connections, and system health. It is also responsible for moderation (abuse prevention), injecting global context overrides (e.g., holiday-themed global prompts), and serving as the configuration wizard for local deployments.
- **`apps/client-api`** (Port 8000) — **The Sensory Gateway**: The primary contact point for end-users and IoT hardware. It handles JWT authentication, receives hardware heartbeats (context triggers), and maintains the Socket.io connections that allow Obai to execute its spontaneous proactivity directly with the user.
- **`apps/web`**: The Web Interface built with Next.js and Shadcn UI. Displays the public-facing chat client and the Admin visual dashboard through Next layouts.
- **`apps/mobile`**: The true pocket-companion native app built with Expo (React Native) + NativeWind, serving as the ultimate sensor and interface for the user.
- **`libs/messaging`**: Real-time Socket.io backbone allowing Obai to achieve spontaneous proactivity.
- **`libs/entities`**: The shared "Long-Term Memory". It contains our persistent database logic consumed by all applications.
- **`libs/intelligence`**: Core AI components powered by `@google/genai`. It handles dynamic personality assignment (traits, gender, maturity) based on regional nuances.

## 🛠️ Tech Stack

- **Framework:** NestJS (Node.js)
- **Database:** PostgreSQL on **Supabase**.
- **ORM:** **Prisma 7** (Configured to use Connection Pooler for runtime and Direct Connection for migrations).

## ⚖️ Golden Rules of Coding (Obai Style)

To maintain high quality and consistency, we follow this mandatory data flow:
`Request` -> `Controller` -> `Service` -> `Repository` -> `Response`

### 1. Data Flow & Structure
- **Requests**: Located in `apps/*/src/*/requests/`. Used for input validation (Laravel FormRequest equivalent). **Do not use the DTO suffix**.
- **Responses**: Located in `apps/*/src/*/responses/`. Used for output transformation (Laravel Resource equivalent).
- **Services**: Contain pure business logic.
- **Repositories**: Located in `libs/entities`. Abstract Prisma calls using a generic `BaseRepository`.

### 2. Coding Style & Clean Code
To keep the codebase consistent and readable, we follow these strict styling rules:

- **Language:** All code (variables, functions, classes, comments) must be in **English**.
- **Variables:** Use descriptive names (e.g., `userRepository` instead of `uRepo`).
- **Semicolons:** Always use semicolons `;`.
- **Class Structure:**
    - Always leave **one empty line** between the class declaration and the first attribute/method.
    - Always leave **one empty line** between methods.
- **Internal Spacing:**
    - **No empty lines** inside functions, loops, or conditionals. Keep logic compact within the block.
- **Braces:** Use K&R style (braces on the same line as the statement).

```typescript
class Example {

  property; // Space above first attribute

  myMethod() {
    const data = "logic";
    return data; // No empty lines inside the method
  }

  nextMethod() {
    // Space between methods
  }
}
```

### 3. Naming & Parameters
- Use descriptive but short names in URLs (e.g., `:id`).
- Always document with `.spec.ts` files for unit tests from the creation of the file.

### 4. Git Workflow & Language Standards
- **Language:** Commit messages, branch names, and PR descriptions must be written in **English**.
- **Branch Naming (GitFlow):**
    - `feature/short-description`: For new features.
    - `bugfix/short-description`: For bug fixes.
    - `hotfix/short-description`: For urgent production fixes.
    - `release/vX.X.X`: For release preparation.
- **Commit Messages:** Follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) standard (e.g., `feat: add device registration`).

### 5. Database (Prisma 7)
- **Prototyping:** Use `npx prisma db push` for quick changes.
- **Production/Stability:** Use `npx prisma migrate dev` to generate SQL history.
- **Important:** Connection URLs NEVER go in `schema.prisma`. They are managed centrally in `prisma.config.ts`.

---

## 🚀 Useful Commands

- **Sync database:** `npx prisma db push`
- **Generate client:** `npx prisma generate`
- **Run all APIs (Backend):** `npm run dev:apis` (Runs Client-API and Admin-API)
- **Run Web Frontend:** `npm run dev:web` (Runs Next.js App)
- **Run Mobile App:** `npm run dev:mobile` (Runs Expo app with NativeWind)
- **Run Full Ecosystem:** `npm run dev:all` (Runs APIs, Web, and Mobile concurrently)
- **Run tests:** `npm run test`
