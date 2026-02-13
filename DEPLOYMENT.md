# Deployment Guide

## Architecture Overview

```
                    ┌─────────────────────────────┐
                    │     Reverse Proxy / LB       │
                    │   (Traefik / Nginx / Cloud)  │
                    └──────┬──────┬──────┬─────────┘
                           │      │      │
              academy.com  │      │      │  business.academy.com
         admin.academy.com │      │      │
                           ▼      ▼      ▼
                       ┌──────┐┌──────┐┌──────┐
                       │ web  ││admin ││ biz  │
                       │:3000 ││:3000 ││:3000 │
                       └──────┘└──────┘└──────┘
```

Each app runs as an independent container exposing port 3000. A reverse proxy routes
traffic based on the `Host` header (subdomain).

## Environment Variables

### Build-time (Vite embeds these into the client bundle)

| Variable           | Description                         | Example                          |
| ------------------ | ----------------------------------- | -------------------------------- |
| `VITE_API_TARGET`  | Backend API URL                     | `https://api.academy.com`        |
| `VITE_STRIPE_KEY`  | Stripe publishable key              | `pk_live_xxx`                    |

These must be passed as `--build-arg` during `docker build`, or set in `.env` for compose.

### Runtime

| Variable     | Description          | Default      |
| ------------ | -------------------- | ------------ |
| `NODE_ENV`   | Node environment     | `production` |
| `PORT`       | Server listen port   | `3000`       |

## Building Docker Images

### All apps

```bash
make docker-build
```

### Single app

```bash
# Via Make
make docker-build-web

# Via Docker directly
docker build --build-arg APP_NAME=web \
             --build-arg VITE_API_TARGET=https://api.academy.com \
             --build-arg VITE_STRIPE_KEY=pk_live_xxx \
             -t academy-web:latest .
```

### Image naming convention

```
academy-<app>:<version>
```

Example: `academy-web:1.2.3`, `academy-admin:1.2.3`, `academy-business:1.2.3`

## Subdomain Routing

Each app serves on its own subdomain:

| Subdomain                  | App      | Description          |
| -------------------------- | -------- | -------------------- |
| `academy.com`              | web      | Public-facing site   |
| `admin.academy.com`        | admin    | Internal admin panel |
| `business.academy.com`     | business | Business dashboard   |

### Local development (docker compose)

The included `docker-compose.yml` uses Traefik for subdomain routing:

```
http://academy.localhost          → web
http://admin.academy.localhost    → admin
http://business.academy.localhost → business
```

Modern browsers resolve `.localhost` subdomains to `127.0.0.1` automatically.

### Production (Nginx example)

```nginx
# /etc/nginx/conf.d/academy.conf

upstream web      { server web:3000; }
upstream admin    { server admin:3000; }
upstream business { server business:3000; }

server {
    listen 80;
    server_name academy.com www.academy.com;
    location / { proxy_pass http://web; }
}

server {
    listen 80;
    server_name admin.academy.com;
    location / { proxy_pass http://admin; }
}

server {
    listen 80;
    server_name business.academy.com;
    location / { proxy_pass http://business; }
}
```

### Production (Traefik labels)

```yaml
# In docker-compose.prod.yml or container orchestration config
labels:
  - "traefik.http.routers.web.rule=Host(`academy.com`)"
  - "traefik.http.routers.web.tls.certresolver=letsencrypt"
```

## Deployment via Vercel (Recommended)

Each app deploys independently to Vercel with its own project and subdomain.
GitHub Actions handles change detection — only apps with changes get deployed.

### Initial Setup (one-time)

#### 1. Create Vercel projects

Create three separate projects on Vercel, one per app. For each project, set the
**Root Directory** to the app's path within the monorepo:

| Vercel Project   | Root Directory    | Domain                   |
| ---------------- | ----------------- | ------------------------ |
| academy-web      | `apps/web`        | `academy.com`            |
| academy-admin    | `apps/admin`      | `admin.academy.com`      |
| academy-business | `apps/business`   | `business.academy.com`   |

You can create them via the Vercel dashboard or CLI:

```bash
# From the repo root
cd apps/web && vercel link
cd apps/admin && vercel link
cd apps/business && vercel link
```

For each project, configure in Vercel dashboard under **Settings > General**:
- **Framework Preset**: Remix (React Router v7 is auto-detected as Remix)
- **Root Directory**: `apps/<app-name>`
- **Install Command**: `pnpm install`
- **Build Command**: `pnpm --filter <app-name> build`
- **Output Directory**: `apps/<app-name>/build`

#### 2. Set environment variables in Vercel

For each project, add environment variables under **Settings > Environment Variables**:
- `VITE_API_TARGET` — your backend API URL
- `VITE_STRIPE_KEY` — Stripe publishable key

#### 3. Get project IDs

Find the project IDs in each Vercel project's **Settings > General** page,
or in the `.vercel/project.json` file after running `vercel link`.

The Org ID is in your Vercel account **Settings** page.

#### 4. Add GitHub secrets

Go to your GitHub repo **Settings > Secrets and variables > Actions** and add:

| Secret                        | Description                           |
| ----------------------------- | ------------------------------------- |
| `VERCEL_TOKEN`                | Vercel personal access token          |
| `VERCEL_ORG_ID`               | Your Vercel team/org ID               |
| `VERCEL_WEB_PROJECT_ID`       | Project ID for the web app            |
| `VERCEL_ADMIN_PROJECT_ID`     | Project ID for the admin app          |
| `VERCEL_BUSINESS_PROJECT_ID`  | Project ID for the business app       |

Create the token at: https://vercel.com/account/tokens

#### 5. Disable Vercel's Git integration (important)

Since GitHub Actions handles deployments, disable Vercel's automatic Git deployments
to avoid double-deploys:

In each Vercel project: **Settings > Git > Connected Git Repository > Disconnect**

### How the CI/CD pipeline works

```
Push to main ─────► GitHub Actions ─────► Detect changed apps
                                               │
                    ┌──────────────────────────┤
                    │              │            │
                    ▼              ▼            ▼
              deploy-web     deploy-admin  deploy-business
              (if changed)   (if changed)  (if changed)
                    │              │            │
                    ▼              ▼            ▼
               Vercel Prod    Vercel Prod  Vercel Prod

Pull Request ────► GitHub Actions ────► Preview deploys (unique URLs)
```

- **Push to `main`** → production deploy to `*.academy.com`
- **Pull requests** → preview deploy with a unique URL per PR
- Changes to `packages/**` trigger ALL apps (since they're shared)
- Changes to `apps/web/**` only trigger the web deploy, etc.
- Concurrent deploys to the same ref are automatically cancelled

### Manual deploy

```bash
# Deploy a single app
make deploy-web
make deploy-admin
make deploy-business

# Deploy all apps
make deploy
```

Requires `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID` environment variables.

## Alternative Deployment Strategies

### Docker Compose on a VPS

Simplest option for self-hosted deployments.

```bash
# On the server
git pull
docker compose --env-file .env.production up --build -d
```

### Container Registry + Orchestration

For higher availability and independent scaling.

```bash
# CI/CD builds and pushes tagged images
docker build --build-arg APP_NAME=web -t registry.example.com/academy-web:$SHA .
docker push registry.example.com/academy-web:$SHA

# Deploy via Kubernetes, Docker Swarm, or cloud container services
```

## Docker Layer Caching Strategy

The Dockerfile is structured for optimal caching:

1. **`base`** — rarely changes (Node version, pnpm version)
2. **`deps`** — only re-runs when `package.json` or `pnpm-lock.yaml` change
3. **`build`** — re-runs when source code changes (but deps are cached)
4. **`deploy`** — extracts production-only dependencies
5. **`runner`** — minimal final image with no build tooling

The pnpm store is mounted as a BuildKit cache (`--mount=type=cache`) so repeated
builds reuse downloaded packages across builds.

## Assumptions

- All apps listen on port 3000 internally (configured by `react-router-serve`)
- The backend API is a separate service not managed by this repo
- `pnpm deploy --prod` creates a standalone bundle with all production dependencies
- Workspace packages (`ui`, `gql-generated`) are bundled at build time by Vite and
  are not needed at runtime
- TLS termination happens at the reverse proxy level, not in the app containers
