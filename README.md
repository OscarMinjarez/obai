# Obai - The Spontaneous AI System

Obai is an intelligent agent ecosystem designed to integrate into all your devices (Phone, PC, Tablet, IoT). Unlike traditional AIs, Obai is proactive and context-aware, communicating with you spontaneously based on your environment and the device you are currently using.

## 🏗️ System Architecture

The project is structured as a monorepo using **NestJS**:

- **`apps/admin-api`**: Administrative management of the system. Runs on port **3001** with global prefix `/api`.
- **`apps/client-api`**: Contact point for devices and end-users. Runs on port **3000** with global prefix `/api`.
- **`libs/entities`**: The shared data "Backbone". It contains the database logic, entities, and repositories consumed by all applications.
- **`libs/intelligence`**: Core AI components powered by `@google/genai` (Gemini 2.5 Flash). It handles dynamic agent identity generation, contexts, and personality traits.

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
- **Run in development:** `npm run dev` (Runs concurrently for both apps)
- **Run tests:** `npm run test`
