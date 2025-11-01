# Web app Dockerfile
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
COPY packages/ui/package.json ./packages/ui/
COPY apps/web/package.json ./apps/web/

# Install all dependencies (including devDependencies for build)
RUN pnpm install --frozen-lockfile --include-workspace-root

# Copy source files
COPY packages ./packages
COPY apps/web ./apps/web

# Reinstall to ensure workspace links are correct after copying source files
RUN pnpm install --frozen-lockfile --prefer-offline

# Build dependencies first
RUN pnpm --filter @skyteam/database build
RUN pnpm --filter @skyteam/ui build

# Build web app
RUN pnpm --filter @skyteam/web build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Install pnpm
RUN corepack enable && corepack prepare pnpm@10.5.2 --activate

# Copy package files
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY packages/database/package.json ./packages/database/
COPY packages/ui/package.json ./packages/ui/
COPY apps/web/package.json ./apps/web/

# Install production dependencies only
RUN pnpm install --prod --frozen-lockfile

# Copy built artifacts
COPY --from=base /app/packages/database/dist ./packages/database/dist
COPY --from=base /app/packages/ui/dist ./packages/ui/dist
COPY --from=base /app/apps/web/.next ./apps/web/.next
COPY --from=base /app/apps/web/public ./apps/web/public
COPY --from=base /app/apps/web/next.config.mjs ./apps/web/
COPY --from=base /app/apps/web/package.json ./apps/web/
COPY --from=base /app/apps/web/tsconfig.json ./apps/web/
COPY --from=base /app/apps/web/contentlayer.config.ts ./apps/web/
COPY --from=base /app/apps/web/postcss.config.mjs ./apps/web/
COPY --from=base /app/apps/web/tailwind.config.ts ./apps/web/

WORKDIR /app/apps/web

EXPOSE 3000

CMD ["pnpm", "start"]

