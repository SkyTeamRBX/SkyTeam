# SkyTeam ROBLOX

<p align="left">
<sub><b>SkyTeamRBX nor this project is in no way affiliated with the SkyTeam Airline Alliance, its member airlines, subsidaries or airlines listed in this project. The usage of logos is not approved by the respective companies.</b></sub>
</p>

This is a monorepo containing all SkyTeam applications and packages.

## Project Structure

```
apps/
  ├── admin/     # Admin panel (Next.js)
  ├── api/       # Backend API (Express)
  ├── models/    # ROBLOX MainModule Model (Rojo)
  ├── client/    # Discord bot (Discord.js + Discordx)
  └── web/       # Main website (Next.js)
packages/
  ├── database/  # Drizzle Postgre Database Client
  └── ui/        # Shared UI Components between the Admin Panel and Main Website
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

## License

GPL-3.0 - All rights reserved
