# Vizwright AI Coding Instructions

## Project Overview

Vizwright is a **visual-first UI testing platform** built as a Deno monorepo. It wraps Playwright to provide drag-and-drop test building, real-time execution visualization, and stakeholder-friendly dashboards—enabling QA, developers, and business users to collaborate on test automation.

## Architecture

```
code/
├── backend/    # Deno + Hono API server (port 3000)
├── frontend/   # Vue 3 + Vite SPA (port 5173)
├── common/     # Shared types and Config class
├── cli/        # `vw` command-line tool
└── scripts/    # Dev tooling (go.sh starts everything)
```

**Key architectural decisions:**
- **Deno runtime** with strict TypeScript (`deno.json` at root defines workspace)
- **Hono** for typed HTTP/WebSocket APIs—never raw `Deno.serve()` handlers
- **TypeBox** for schema validation (DDL/YAML test definitions)
- **Vue 3 + Pinia** for reactive frontend state
- **Config class** (`code/common/config/config.ts`) centralizes all file paths—always use it

## Developer Workflow

### Start Development
```bash
deno task go          # Starts both frontend (5173) and backend (3000)
```

### Individual Services
```bash
deno task dev:backend   # Backend with --watch
deno task dev:frontend  # Vite dev server
deno task dev:cli       # CLI in dev mode
```

### Build
```bash
deno task build:backend   # Compiles to dist/vizwright
deno task build:frontend  # Vite production build
deno task build:cli       # Compiles to dist/vw
```

### Logs
Logs are written to `tmp/be-logs/` and `tmp/fe-logs/`. Clear with:
```bash
deno task clear-logs
```

## Code Conventions

### Backend (Hono API)
- Mount routes via `app.route()` in `code/backend/api/index.ts`
- Create feature routes in `api/{feature}/{feature}.routes.ts`
- Example pattern from `health.routes.ts`:
```typescript
import { Hono } from "hono";
const health = new Hono();
health.get("/", (c) => c.json({ status: "healthy" }));
export default health;
```

### Frontend (Vue 3)
- Use `<script setup>` syntax for components
- Router defined in `src/router/index.ts` with lazy-loaded views
- PrimeVue for UI components, Pinia for state
- Views go in `src/views/`, reusable components in `src/components/`

### File Access
**Always use the Config class** for file operations:
```typescript
import Config from "@vizwright/common/config/config.ts";

Config.ProjectsPath("my-project/test.yaml")  // /workspaces/vizwright/projects/my-project/test.yaml
Config.SampleAppsPath()                       // /workspaces/vizwright/sample-apps
await Config.GetJson<T>("projects", "config.json")
```

### Import Maps
The workspace uses Deno import maps. Key aliases:
- `@vizwright/common/` → `./code/common/`
- `hono` → `npm:hono@^4`
- `@sinclair/typebox` → `npm:@sinclair/typebox@^0.34`

## Key Directories

| Directory | Purpose |
|-----------|---------|
| `projects/` | User test projects (git-managed, YAML scenarios) |
| `sample-apps/` | Demo web apps for testing against |
| `assets/` | Extension system—see structure below |
| `tmp/` | Logs and temporary files (gitignored) |
| `docs/specification/` | Product specs—read these for feature context |

### Assets Structure (Evolving)
The `assets/` folder houses the extension system with emerging patterns:
- `primitives/` — Isolate system from direct Playwright calls (abstraction layer)
- `processes/` — Connect common sequences (e.g., find-and-click flows)
- `tools/` — Useful utilities that emerge through experimentation

## DDL/DSL Concepts

When implementing test execution features:
- **DDL (YAML)**: Declarative test definitions with phases, actions, assertions
- **DSL (TypeScript)**: Runtime engine that interprets DDL
- **EOI (Elements of Interest)**: DOM elements discovered for testing—buttons, inputs, links
- **Phases**: Test stages representing UI state transitions

## Environment

- `PROJECT_ROOT` env var points to workspace root (set in devcontainer)
- Ports: Backend 3000, Frontend 5173
- The CLI (`vw`) reads config from `~/.vizwrightrc` or `.vizwrightrc`

## Development Process

This project follows **Emergent Architecture**—structure evolves from validated needs, not upfront design.

### The Cycle
1. **Identify Need**: A concrete requirement surfaces (e.g., "we need to find and click buttons")
2. **Experiment**: Prove the concept with minimal code
3. **Validate**: Confirm it works in practice
4. **Stabilize**: Refactor into the emerging patterns
5. **Test**: Add tests only after stabilization

### What This Means for AI Agents
- **Don't create abstractions speculatively**—wait for a validated need
- **Expect patterns to evolve**—the DDL/DSL and extension system emerge through usage
- **Follow existing patterns** when they exist, but propose improvements when friction appears
- **Example**: We need to click buttons → this drives creation of a `primitives/` module to wrap Playwright, and a `processes/` module for find-and-click sequences. Without the need, these wouldn't exist.

When building new features, start minimal and let structure emerge from actual usage.

## What NOT to Do

- Don't use raw file paths—use Config class methods
- Don't add HTTP handlers outside Hono's route pattern
- Don't use Playwright's codegen—Vizwright captures intent, not brittle selectors
- Don't write to directories outside `tmp/` for temporary data

## Critical Rules for AI Agents

### NO Screenshots
**Screenshots are forbidden.** They cause privacy issues and corrupt context for non-visual models. Instead:
- Use `browser_snapshot` for accessibility tree (preferred)
- Use `browser_evaluate` to query DOM state
- As a last resort, ask the user to provide a screenshot manually

### NO Killing/Restarting Servers
The frontend (5173) and backend (3000) run continuously with hot-reload. **Never attempt to kill or restart them.** If you suspect something is stuck:
- Ask the user to restart via `deno task go`
- The user can do this quickly; AI intervention causes more problems

### Correct Ports
Memorize these—getting them wrong wastes everyone's time:
- **Backend API**: `http://localhost:3000` (Hono server)
- **Frontend UI**: `http://localhost:5173` (Vite dev server)

### No `| tail` on Long-Running Commands
When running tests or long processes, **never pipe to `tail`**—you can't see if it's stuck. Instead:
```bash
command 2>&1 | tee tmp/scratch-logs/output.log
```
Then examine the log file to see full output and progress.
