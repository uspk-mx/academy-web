# syntax=docker/dockerfile:1

# =============================================================================
# Monorepo Dockerfile — builds any app via: --build-arg APP_NAME=<web|admin|business>
# =============================================================================

# --- Base: Node 20 + pnpm ---------------------------------------------------
FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@10.28.2 --activate
WORKDIR /app

# --- Dependencies: install from lockfile (cached when package.json unchanged)
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/admin/package.json   ./apps/admin/
COPY apps/business/package.json ./apps/business/
COPY apps/web/package.json     ./apps/web/
COPY packages/ui/package.json      ./packages/ui/
COPY packages/graphql/package.json ./packages/graphql/
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile

# --- Build: compile the target application -----------------------------------
FROM base AS build
ARG APP_NAME

# Vite embeds VITE_* variables at build time — pass via --build-arg
ARG VITE_API_TARGET
ARG VITE_STRIPE_KEY
ENV VITE_API_TARGET=${VITE_API_TARGET}
ENV VITE_STRIPE_KEY=${VITE_STRIPE_KEY}

COPY --from=deps /app ./
COPY . .
RUN pnpm --filter "${APP_NAME}" build

# --- Deploy: create standalone production bundle -----------------------------
FROM base AS deploy
ARG APP_NAME
COPY --from=build /app ./
RUN pnpm --filter "${APP_NAME}" deploy --prod /prod

# --- Runner: minimal production image ----------------------------------------
FROM node:20-alpine AS runner
ENV NODE_ENV=production
WORKDIR /app

# Only copy production node_modules + build artifacts (no source code)
COPY --from=deploy /prod/node_modules ./node_modules
COPY --from=deploy /prod/package.json ./
ARG APP_NAME
COPY --from=build /app/apps/${APP_NAME}/build ./build

EXPOSE 3000
CMD ["node_modules/.bin/react-router-serve", "./build/server/index.js"]
