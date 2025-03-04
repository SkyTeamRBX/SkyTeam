import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { users } from './schema';
import { eq } from 'drizzle-orm';

// Initialize the Postgres client
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
	throw new Error('DATABASE_URL environment variable is not set');
}

const client = postgres(connectionString);
export const db = drizzle(client);

export type User = typeof users.$inferSelect;

/**
 * Fetches a user by their Roblox user ID from the database
 * @param userId - The Roblox user ID to look up
 * @returns Promise resolving to the User if found, null otherwise
 */
export async function fetchUser(userId: string): Promise<User | null> {
	const result = await db.select().from(users).where(eq(users.userId, userId)).limit(1);
	return result[0] || null;
}

/**
 * Creates a new user in the database
 * @param data - Object containing user data (userId, username, displayName, optional avatarUrl)
 * @returns Promise resolving to the newly created User
 */
export async function createUser(data: {
	userId: string;
	username: string;
	displayName: string;
	avatarUrl?: string;
}): Promise<User> {
	const result = await db.insert(users)
		.values(data)
		.returning();

	return result[0];
}

/**
 * Updates the miles for a user
 * @param userId - The Roblox user ID of the user to update
 * @param miles - The new miles value to set
 * @returns Promise resolving to the updated User if found, null otherwise
 */
export async function updateMiles(userId: string, miles: number): Promise<User | null> {
	const result = await db.update(users)
		.set({ miles })
		.where(eq(users.userId, userId))
		.returning();

	return result[0] || null;
}

// Export schema and types
export * from './schema'; 