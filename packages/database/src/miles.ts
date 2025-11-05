import { db } from "./db";
import { milesTransactions } from "./schema";
import { eq } from "drizzle-orm";

export type MilesTransaction = typeof milesTransactions.$inferSelect;

export async function addMilesTransaction(
	data: {
		userId: string;
		amount: number; // positive for earn, negative for spend
		type: "earn" | "spend";
		source: "flight" | "purchase" | string;
		flightId?: string;
		productId?: string;
		note?: string;
	},
	tx?: any,
): Promise<MilesTransaction> {
	const dbInstance = tx || db;
	const result = await dbInstance.insert(milesTransactions).values(data).returning();
	return result[0];
}

export async function fetchMilesTransactions(
	userId: string,
): Promise<MilesTransaction[]> {
	return db
		.select()
		.from(milesTransactions)
		.where(eq(milesTransactions.userId, userId));
}
