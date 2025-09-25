SHELL := /bin/bash

.PHONY: dev api web db-up db-down prisma-generate prisma-migrate seed

dev:
	npm run dev:api & npm run dev:web

api:
	npm run dev:api

web:
	npm run dev:web

db-up:
	docker compose up -d postgres

db-down:
	docker compose down -v

prisma-generate:
	npx prisma generate --schema apps/api/prisma/schema.prisma

prisma-migrate:
	npx prisma migrate dev --name init --schema apps/api/prisma/schema.prisma

seed:
	npx ts-node apps/api/src/seed.ts

