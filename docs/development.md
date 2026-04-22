# Development Guidelines

This project follows strict conventions to keep the codebase consistent and maintainable.

## Data flow

Always follow the canonical pipeline:

```
Request -> Controller -> Service -> Repository -> Response
```

- Requests for validation live under `apps/*/src/*/requests/` (do not add `DTO` suffix).
- Responses live under `apps/*/src/*/responses/`.
- Repositories are in `libs/entities` and wrap Prisma access.

## Coding style

- Language: English for code and comments.
- Use descriptive variable names.
- Semicolons are required.
- Class formatting rules: leave one empty line after class declaration and between methods. No empty lines inside method bodies.
- Braces: K&R style.

Example:

```typescript
class Example {

  property;

  myMethod() {
    const data = "logic";
    return data;
  }

  nextMethod() {
  }
}
```

## Tests & Specs

- Create `.spec.ts` files alongside logic when adding new modules.
- Run tests with `npm run test`.

## Git workflow

- Branch naming: `feature/`, `bugfix/`, `hotfix/`, `release/`.
- Follow Conventional Commits for commit messages.

