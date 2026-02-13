# Academy Web

Monorepo with three React Router v7 apps and shared packages, managed with pnpm workspaces.

## Architecture

```
academy-web/
├── apps/
│   ├── web/             # Public-facing student portal     (port 3000)
│   ├── admin/           # Internal admin panel             (port 3001)
│   └── business/        # Business / enterprise dashboard  (port 3002)
├── packages/
│   ├── ui/              # Shared UI components (shadcn/ui + Radix)
│   └── graphql/         # GraphQL schema, queries & codegen
├── .github/workflows/   # CI + Vercel deployment pipelines
├── Dockerfile           # Production multi-stage build
├── Dockerfile.dev       # Development base image
├── docker-compose.yml   # Production with Traefik reverse proxy
├── docker-compose.dev.yml # Development with hot reload
└── Makefile             # Convenience commands
```

## Prerequisites

| Tool  | Version  |
|-------|----------|
| Node  | 20+      |
| pnpm  | 10.28.2  |

> If you use Docker for development, you don't need Node or pnpm installed locally.

## Getting Started

### 1. Clone and install

```bash
git clone <repo-url>
cd academy-web
pnpm install
```

### 2. Configure environment variables

Copy the example and fill in your values:

```bash
cp .env.example .env
```

| Variable           | Description              | Example                   |
|--------------------|--------------------------|---------------------------|
| `VITE_API_TARGET`  | Backend API URL          | `http://localhost:4000`   |
| `VITE_STRIPE_KEY`  | Stripe publishable key   | `pk_test_xxx`             |

### 3. Run the apps

```bash
# All apps in parallel
pnpm dev

# Single app
pnpm dev:web        # http://localhost:3000
pnpm dev:admin      # http://localhost:3001
pnpm dev:business   # http://localhost:3002
```

## Development with Docker

No local Node or pnpm needed. First run installs dependencies (~60s), subsequent starts are near-instant.

```bash
# Start all apps with hot reload
make docker-dev

# Start a single app
make docker-dev-web
make docker-dev-admin
make docker-dev-business

# View logs
make docker-dev-logs

# Stop containers
make docker-dev-down

# Stop + wipe cached node_modules
make docker-dev-clean
```

Access the apps at the same ports: `localhost:3000`, `:3001`, `:3002`.

### Adding dependencies inside Docker

```bash
docker compose -f docker-compose.dev.yml run --rm setup pnpm add <package> --filter <app>
```

## Available Commands

### pnpm scripts

| Command               | Description                         |
|-----------------------|-------------------------------------|
| `pnpm dev`            | Run all apps in dev mode            |
| `pnpm build`          | Build all apps                      |
| `pnpm preview`        | Preview all apps                    |
| `pnpm typecheck`      | Type-check all apps and packages    |
| `pnpm dev:<app>`      | Run a single app (`web`, `admin`, `business`) |
| `pnpm build:<app>`    | Build a single app                  |
| `pnpm codegen`        | Run GraphQL code generation         |
| `pnpm ui`             | Add a shadcn/ui component           |

### Make targets

| Command                   | Description                             |
|---------------------------|-----------------------------------------|
| `make install`            | Install all dependencies                |
| `make dev`                | Dev all apps                            |
| `make dev-web`            | Dev web only                            |
| `make build`              | Build all apps                          |
| `make ci`                 | Run CI checks (typecheck + build)       |
| `make codegen`            | GraphQL code generation                 |
| `make docker-dev`         | Dev with Docker (hot reload)            |
| `make docker-dev-down`    | Stop dev containers                     |
| `make docker-dev-clean`   | Stop + wipe cached node_modules         |
| `make docker-build`       | Build production Docker images          |
| `make docker-up`          | Start production containers             |
| `make docker-down`        | Stop production containers              |
| `make deploy`             | Deploy all apps to Vercel               |
| `make deploy-<app>`       | Deploy a single app to Vercel           |
| `make clean`              | Remove build artifacts                  |
| `make clean-all`          | Remove build artifacts + node_modules   |

Run `make help` to see the full list.

## Tech Stack

| Layer         | Technology                                           |
|---------------|------------------------------------------------------|
| Framework     | React Router v7 (SSR)                                |
| UI            | React 19, Tailwind CSS 4, shadcn/ui, Radix           |
| Data          | GraphQL with URQL, GraphQL Code Generator             |
| Forms         | React Hook Form + Zod                                |
| Payments      | Stripe                                               |
| Build         | Vite 7                                               |
| Language      | TypeScript 5                                         |
| Package Mgr   | pnpm workspaces                                     |

## Shared Packages

### `packages/ui`

Shared component library built on shadcn/ui + Radix primitives. Add components with:

```bash
pnpm ui          # interactive prompt to pick a component
```

Import in apps:

```tsx
import { Button } from "ui/components/button";
```

### `packages/graphql`

GraphQL schema, queries, fragments and generated types. After modifying `.graphql` files, regenerate:

```bash
pnpm codegen
```

This runs two codegen passes:
- **Client** — generates typed hooks and persisted documents in `gql/`
- **Server** — generates TypeScript types and a BFF SDK in `generated/`

Import in apps:

```tsx
import type { CourseFragment } from "gql-generated";
```

## Production Docker

Build and run all apps behind a Traefik reverse proxy with subdomain routing:

```bash
make docker-build
make docker-up
```

| Subdomain                        | App      |
|----------------------------------|----------|
| `http://academy.localhost`       | web      |
| `http://admin.academy.localhost` | admin    |
| `http://business.academy.localhost` | business |

Traefik dashboard: `http://localhost:8080`

## CI/CD

Automated via GitHub Actions. See [DEPLOYMENT.md](DEPLOYMENT.md) for the full deployment guide.

- **CI** — typecheck + build on every push and PR to `main`
- **Deploy** — detects changed apps and deploys only those to Vercel
- Shared package changes (`packages/*`) trigger deployment of all apps
- Push to `main` → production deploy, PR → preview deploy

## Project Conventions

- All apps use SSR (`ssr: true` in `react-router.config.ts`)
- Environment variables prefixed with `VITE_` are embedded at build time
- Each app runs on port 3000 internally; dev ports differ only for local parallel development
- Workspace packages are resolved via pnpm workspaces + Vite aliases + TypeScript path mappings
