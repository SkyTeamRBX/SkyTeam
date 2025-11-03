import { db } from "./db";
import { users } from "./schema";
import { eq } from "drizzle-orm";
import { increment } from "./utils";
import { addMilesTransaction } from "./miles";

export type User = typeof users.$inferSelect;

/**
 * Fetches a user by their Roblox user ID from the database
 */
export async function fetchUser(userId: string): Promise<User | null> {
	const result = await db.select().from(users).where(eq(users.userId, userId)).limit(1);
	return result[0] || null;
}

/**
 * Creates a new user in the database
 */
export async function createUser(data: {
	userId: string;
	username: string;
	displayName: string;
	avatarUrl?: string;
}): Promise<User> {
	const result = await db.insert(users).values(data).returning();
	return result[0];
}

/**
 * Increments the miles for a user
 */
export async function incrementMiles(userId: string, amount = 1): Promise<User | null> {
	const result = await db
		.update(users)
		.set({ miles: increment(users.miles, amount) })
		.where(eq(users.userId, userId))
		.returning();
	return result[0] || null;
}

export async function spendMiles(userId: string, amount: number, note?: string): Promise<User | null> {
	if (amount <= 0) throw new Error("amount must be positive");
	const updated = await db
		.update(users)
		.set({ miles: increment(users.miles, -amount) })
		.where(eq(users.userId, userId))
		.returning();
	const user = updated[0] || null;
	await addMilesTransaction({ userId, amount: -amount, type: "spend", source: "purchase", note });
	return user;
}


