# Rocket Bank (MVP)

Developer-first banking platform for BG clients with Web4/DeFi (Aave read-only), Open Banking (OBP sandbox), Stripe stub, and AI via OpenRouter/OpenAI.

## Features
- Auth, Users, Accounts, Internal Transfers
- AI Gateway (OpenRouter/OpenAI), simple risk-score stub
- DeFi (Aave) markets read-only sample
- Open Bank Project sandbox sample (banks listing)
- Stripe PaymentIntent stub
- Next.js dashboard: Dashboard, Accounts, Payments, DeFi, AI

## Requirements
- Node.js 20+
- Docker (for local Postgres). If not available, set up your own Postgres and update `DATABASE_URL`.

## Quick Start
```bash
# 1) Clone and prepare
cp .env.example .env

# 2) Start Postgres (Docker)
docker compose up -d

# 3) Install deps and generate Prisma client
npm install
npm run prisma:generate

# 4) Run DB migrations
npm run prisma:migrate

# 5) Start services
npm run dev:api    # http://localhost:4000
npm run dev:web    # http://localhost:3000
```

### With docker-compose
```bash
docker compose up -d --build
# API: http://localhost:4000
# Web: http://localhost:3000
```

If Docker is not available, ensure your Postgres runs at `DATABASE_URL` (default: `postgresql://bank:bankpass@localhost:5432/bankdb?schema=public`).

## Configuration
Edit `.env`:
- JWT, DB URL
- AI: `AI_PROVIDER`, `OPENROUTER_API_KEY` / `OPENAI_API_KEY`
- Aave: network and RPC
- OBP sandbox: base URL and keys
- Stripe (stub by default)

## Notes
- This is an MVP codebase. Production requires full compliance (BG BNB, PSD2, KYC/AML, GDPR, PCI DSS, fraud, monitoring, audit logs).
- Replace OBP and Stripe stubs with full OAuth/token flows and server-side webhooks.
- Aave integration shows read-only market data; extend with SDK and on-chain ops on testnets.

## Packages
- `apps/api`: Express + Prisma + routes
- `apps/web`: Next.js 14 App Router UI

## Scripts
- `npm run dev:api`, `npm run dev:web`
- `npm run prisma:generate`, `npm run prisma:migrate`
- `npm run db:up`, `npm run db:down`

## License
Proprietary — Rocket Bank. All rights reserved.

## Deploy
- Render: use `render.yaml` as Blueprint. Set secrets in service env (JWT_SECRET, DATABASE_URL from managed DB, API keys).
- GitHub Actions:
  - CI: `.github/workflows/ci.yml` builds API and Web.
  - Docker images: `.github/workflows/docker-publish.yml` pushes to GHCR on tag.
  - Migrations: `.github/workflows/migrate.yml` runs Prisma migrate with `DATABASE_URL` secret.

### GH Secrets to add
- DATABASE_URL
- JWT_SECRET
- OPENROUTER_API_KEY / OPENAI_API_KEY
- OBP_CONSUMER_KEY / OBP_CONSUMER_SECRET / OBP_USERNAME / OBP_PASSWORD
- STRIPE_API_KEY / STRIPE_WEBHOOK_SECRET
- AAVE_RPC_URL / AAVE_POOL_ADDRESS_PROVIDER