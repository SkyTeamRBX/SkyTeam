import { db } from "./db";
import { users } from "./schema";
import { eq } from "drizzle-orm";
import { increment } from "./utils";
import { addMilesTransaction } from "./miles";

export type User = typeof users.$inferSelect;
export type DbTransaction = Parameters<Parameters<typeof db.transaction>[0]>[0];

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
export async function incrementMiles(
	userId: string,
	amount = 1,
	tx?: DbTransaction,
): Promise<User | null> {
	const dbInstance = tx || db;
	const result = await dbInstance
		.update(users)
		.set({ miles: increment(users.miles, amount) })
		.where(eq(users.userId, userId))
		.returning();
	return result[0] || null;
}

export async function spendMiles(
	userId: string,
	amount: number,
	note?: string,
): Promise<User | null> {
	if (amount <= 0) throw new Error("amount must be positive");

	return await db.transaction(async (tx) => {
		// Fetch user to check balance
		const userResult = await tx
			.select()
			.from(users)
			.where(eq(users.userId, userId))
			.limit(1);
		const user = userResult[0];

		if (!user) throw new Error("User not found");
		if (user.miles < amount) throw new Error("Insufficient miles");

		// Update miles
		const updated = await tx
			.update(users)
			.set({ miles: increment(users.miles, -amount) })
			.where(eq(users.userId, userId))
			.returning();

		// Add transaction record
		await addMilesTransaction(
			{ userId, amount: -amount, type: "spend", source: "purchase", note },
			tx,
		);

		return updated[0] || null;
	});
}


