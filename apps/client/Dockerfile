# Client (Discord bot) Dockerfile
FROM node:20-alpine AS base

# Install pnpm
RUN corepack enable && corepack prepare pnpm@10.5.2 --activate

# Set working directory
WORKDIR /app

# Copy workspace files
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY turbo.json ./

# Copy package files
COPY packages/database/package.json ./packages/database/
COPY apps/client/package.json ./apps/client/

# Install all dependencies (including devDependencies for build)
RUN pnpm install --frozen-lockfile --include-workspace-root

# Copy source files
COPY packages/database ./packages/database
COPY apps/client ./apps/client

# Reinstall to ensure workspace links are correct after copying source files
RUN pnpm install --frozen-lockfile --prefer-offline

# Build dependencies first
RUN pnpm --filter @skyteam/database build

# Build client app
RUN pnpm --filter @skyteam/client build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Install pnpm
RUN corepack enable && corepack prepare pnpm@10.5.2 --activate

# Copy package files
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY packages/database/package.json ./packages/database/
COPY apps/client/package.json ./apps/client/

# Install production dependencies only
RUN pnpm install --prod --frozen-lockfile

# Copy built artifacts
COPY --from=base /app/packages/database/dist ./packages/database/dist
COPY --from=base /app/apps/client/dist ./apps/client/dist

WORKDIR /app/apps/client

CMD ["pnpm", "start"]

