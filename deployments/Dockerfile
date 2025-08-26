# ---- Base ----
FROM node:22-alpine AS base
WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./
COPY apps ./apps
#COPY libs ./libs

# ---- Builder ----
FROM base AS builder
RUN npm install --production=false
RUN npm run build

# ---- Runner ----
FROM node:22-alpine AS runner
WORKDIR /app

COPY package*.json ./
RUN npm install --production=true

COPY --from=builder /app/dist ./dist

ENV NODE_ENV=production