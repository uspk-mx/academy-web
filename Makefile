# =============================================================================
# Makefile — academy-web monorepo
# =============================================================================

APPS         := web admin business
DOCKER_COMP  := docker compose
DOCKER_DEV   := docker compose -f docker-compose.dev.yml

.PHONY: help install dev build typecheck codegen clean \
        $(addprefix dev-,$(APPS)) \
        $(addprefix build-,$(APPS)) \
        docker-build docker-up docker-down docker-logs \
        $(addprefix docker-build-,$(APPS)) \
        docker-dev docker-dev-down docker-dev-logs docker-dev-clean \
        $(addprefix docker-dev-,$(APPS)) \
        ci deploy $(addprefix deploy-,$(APPS))

# Default target
help:
	@echo ""
	@echo "  academy-web monorepo"
	@echo "  ===================="
	@echo ""
	@echo "  Dependencies"
	@echo "    make install              Install all workspace dependencies"
	@echo ""
	@echo "  Development"
	@echo "    make dev                  Run all apps in dev mode (parallel)"
	@echo "    make dev-web              Run only the web app"
	@echo "    make dev-admin            Run only the admin app"
	@echo "    make dev-business         Run only the business app"
	@echo ""
	@echo "  Build"
	@echo "    make build                Build all apps"
	@echo "    make build-web            Build the web app"
	@echo "    make build-admin          Build the admin app"
	@echo "    make build-business       Build the business app"
	@echo ""
	@echo "  Quality"
	@echo "    make ci                   Run all CI checks (typecheck + build)"
	@echo "    make typecheck            Type-check all apps and packages"
	@echo "    make codegen              Run GraphQL code generation"
	@echo ""
	@echo "  Docker (dev — hot reload, no local Node needed)"
	@echo "    make docker-dev           Start all apps with hot reload"
	@echo "    make docker-dev-web       Start only web with hot reload"
	@echo "    make docker-dev-admin     Start only admin with hot reload"
	@echo "    make docker-dev-business  Start only business with hot reload"
	@echo "    make docker-dev-down      Stop dev containers"
	@echo "    make docker-dev-logs      Follow dev container logs"
	@echo "    make docker-dev-clean     Stop + wipe cached node_modules"
	@echo ""
	@echo "  Docker (production images)"
	@echo "    make docker-build         Build Docker images for all apps"
	@echo "    make docker-build-web     Build Docker image for web"
	@echo "    make docker-build-admin   Build Docker image for admin"
	@echo "    make docker-build-business Build Docker image for business"
	@echo "    make docker-up            Start all containers"
	@echo "    make docker-down          Stop all containers"
	@echo "    make docker-logs          Follow container logs"
	@echo ""
	@echo "  Vercel"
	@echo "    make deploy               Deploy all apps to Vercel (production)"
	@echo "    make deploy-web           Deploy web to Vercel"
	@echo "    make deploy-admin         Deploy admin to Vercel"
	@echo "    make deploy-business      Deploy business to Vercel"
	@echo ""
	@echo "  Cleanup"
	@echo "    make clean                Remove build artifacts"
	@echo "    make clean-all            Remove build artifacts + node_modules"
	@echo ""

# =============================================================================
# Dependencies
# =============================================================================

## Install all workspace dependencies (each workspace gets its own node_modules)
install:
	pnpm install

# =============================================================================
# Development
# =============================================================================

## Run all apps in parallel dev mode
dev:
	pnpm --parallel --filter './apps/*' dev

## Run individual apps
dev-web:
	pnpm --filter web dev

dev-admin:
	pnpm --filter admin dev

dev-business:
	pnpm --filter business dev

# =============================================================================
# Build
# =============================================================================

## Build all apps
build:
	pnpm --filter './apps/*' build

## Build individual apps
build-web:
	pnpm --filter web build

build-admin:
	pnpm --filter admin build

build-business:
	pnpm --filter business build

# =============================================================================
# Quality
# =============================================================================

## Type-check all workspaces
typecheck:
	pnpm --parallel --filter './apps/*' --filter './packages/*' run typecheck

## Run all CI checks locally (mirrors .github/workflows/ci.yml)
ci: typecheck build

## Run GraphQL code generation
codegen:
	pnpm --parallel --filter ./packages/graphql run codegen

# =============================================================================
# Docker — development (hot reload, no local Node/pnpm required)
# =============================================================================

## Start all apps in Docker with hot reload
docker-dev:
	$(DOCKER_DEV) up

## Start a single app in Docker with hot reload
docker-dev-%:
	$(DOCKER_DEV) up setup $*

## Stop dev containers
docker-dev-down:
	$(DOCKER_DEV) down

## Follow dev container logs
docker-dev-logs:
	$(DOCKER_DEV) logs -f

## Stop dev containers and remove cached node_modules volumes
docker-dev-clean:
	$(DOCKER_DEV) down -v

# =============================================================================
# Docker — production images
# =============================================================================

## Build all Docker images
docker-build:
	$(DOCKER_COMP) build

## Build individual Docker images
docker-build-%:
	$(DOCKER_COMP) build $*

## Start all containers (detached)
docker-up:
	$(DOCKER_COMP) up -d

## Stop all containers
docker-down:
	$(DOCKER_COMP) down

## Follow container logs
docker-logs:
	$(DOCKER_COMP) logs -f

# =============================================================================
# Vercel (requires VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID env vars)
# =============================================================================

## Deploy all apps to Vercel production
deploy:
	@for app in $(APPS); do \
		echo "--- Deploying $$app ---"; \
		$(MAKE) deploy-$$app; \
	done

## Deploy a single app to Vercel production
deploy-%:
	vercel pull --yes --environment=production --token=$(VERCEL_TOKEN)
	vercel build --prod --token=$(VERCEL_TOKEN)
	vercel deploy --prebuilt --prod --token=$(VERCEL_TOKEN)

# =============================================================================
# Cleanup
# =============================================================================

## Remove build artifacts and caches
clean:
	rm -rf apps/*/build apps/*/.react-router

## Remove everything (build artifacts + all node_modules)
clean-all: clean
	rm -rf node_modules apps/*/node_modules packages/*/node_modules
