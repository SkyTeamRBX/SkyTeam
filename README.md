# SkyTeam Monorepo

This is a monorepo containing all SkyTeam applications and packages.

## Project Structure

```
apps/
  ├── admin/     # Admin panel (Next.js)
  ├── api/       # Backend API (Express)
  ├── client/    # Discord bot (Discord.js + Discordx)
  └── web/       # Main website (Next.js)
packages/
  ├── database/  # Prisma database client
  └── ui/        # Shared UI components
```

## Getting Started

### Prerequisites

- Node.js 18 or later
- PNPM 8.15.4 or later
- PostgreSQL database

### Setup

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Set up environment variables:
   - Copy `.env.example` to `.env` in the root directory
   - Set up your database connection string in `DATABASE_URL`
   - For the Discord bot, set up your `DISCORD_TOKEN`

3. Initialize the database:
   ```bash
   pnpm --filter @skyteam/database db:push
   ```

4. Start development servers:
   ```bash
   pnpm dev
   ```

This will start all applications in development mode:
- Web: http://localhost:3000
- Admin: http://localhost:3001
- API: http://localhost:4000
- Discord bot will connect to Discord

## Scripts

- `pnpm build`: Build all applications
- `pnpm dev`: Start all applications in development mode
- `pnpm lint`: Lint all applications
- `pnpm format`: Format all code with Prettier

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Create a pull request

## License

Private - All rights reserved 