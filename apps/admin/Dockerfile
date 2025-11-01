# Admin app Dockerfile
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
COPY apps/admin/package.json ./apps/admin/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source files
COPY packages ./packages
COPY apps/admin ./apps/admin

# Build dependencies first
RUN pnpm --filter @skyteam/database build
RUN pnpm --filter @skyteam/ui build

# Build admin app
RUN pnpm --filter @skyteam/admin build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV production

# Install pnpm
RUN corepack enable && corepack prepare pnpm@10.5.2 --activate

# Copy package files
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY packages/database/package.json ./packages/database/
COPY packages/ui/package.json ./packages/ui/
COPY apps/admin/package.json ./apps/admin/

# Install production dependencies only
RUN pnpm install --prod --frozen-lockfile

# Copy built artifacts
COPY --from=base /app/packages/database/dist ./packages/database/dist
COPY --from=base /app/packages/ui/dist ./packages/ui/dist
COPY --from=base /app/apps/admin/.next ./apps/admin/.next
COPY --from=base /app/apps/admin/public ./apps/admin/public
COPY --from=base /app/apps/admin/next.config.ts ./apps/admin/
COPY --from=base /app/apps/admin/package.json ./apps/admin/
COPY --from=base /app/apps/admin/tsconfig.json ./apps/admin/

WORKDIR /app/apps/admin

EXPOSE 3001

CMD ["pnpm", "start"]

