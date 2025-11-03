import { db } from "./db";
import { airlines } from "./schema";
import { eq } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";

export type Airline = typeof airlines.$inferSelect;

export async function fetchAirline(airlineId: string): Promise<Airline | null> {
	const result = await db
		.select()
		.from(airlines)
		.where(eq(airlines.airlineId, airlineId))
		.limit(1);
	return result[0] || null;
}

export async function fetchAllAirlines(): Promise<Airline[]> {
	return db.select().from(airlines);
}

export async function fetchAirlineByToken(
	token: string,
): Promise<Airline | null> {
	const result = await db
		.select()
		.from(airlines)
		.where(eq(airlines.token, token))
		.limit(1);
	return result[0] || null;
}

export async function createAirline(data: {
	airlineId: string;
	name: string;
	inviteLink?: string;
	serverId?: number;
}): Promise<Airline> {
	const newData = { ...data, token: createId() };
	const result = await db.insert(airlines).values(newData).returning();
	return result[0];
}
