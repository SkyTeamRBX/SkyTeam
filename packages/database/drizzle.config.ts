import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	// @ts-ignore
	dialect: 'postgresql',
	schema: './src/schema.ts',
	out: './drizzle',
	driver: 'pg',
	dbCredentials: {
		connectionString: process.env.DATABASE_URL!,
	},
	verbose: true,
	strict: true,
})