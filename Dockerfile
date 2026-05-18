# Stage 1: install all dependencies (including dev for build tools + prisma CLI)
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Stage 2: build the app
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate && npm run build

# Stage 3: production runner
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy node_modules from builder (includes prisma generate output in .prisma/client)
COPY --from=builder /app/node_modules ./node_modules

# Copy built output
COPY --from=builder /app/dist ./dist

# Copy prisma schema + migrations + config for migrate deploy
COPY prisma ./prisma
COPY prisma.config.ts ./

# Copy package.json for npm start
COPY package.json ./

# Copy entrypoint
COPY docker-entrypoint.sh ./
RUN chmod +x docker-entrypoint.sh

# Persistent upload directory
RUN mkdir -p /app/public/uploads

EXPOSE 8080
ENTRYPOINT ["./docker-entrypoint.sh"]
