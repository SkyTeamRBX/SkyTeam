import { db } from "./db";
import { airlines, milesProducts } from "./schema";
import { eq } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";
import { customAlphabet } from "nanoid";

export type Airline = typeof airlines.$inferSelect;
export type MilesProduct = typeof milesProducts.$inferSelect;

const generateProductId = customAlphabet(
	"0123456789abcdefghijklmnopqrstuvwxyz",
	6,
);

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
	serverId?: string;
}): Promise<Airline> {
	const newData = { ...data, token: createId() };
	const result = await db.insert(airlines).values(newData).returning();
	return result[0];
}

export async function createMilesProduct(data: {
	airlineId: string;
	name: string;
	priceMiles: number;
	description?: string;
	active?: boolean;
}): Promise<MilesProduct> {
	const productId = generateProductId();
	const result = await db
		.insert(milesProducts)
		.values({
			productId,
			airlineId: data.airlineId,
			name: data.name,
			priceMiles: data.priceMiles,
			description: data.description,
			active: data.active ?? true,
		})
		.returning();
	return result[0];
}

export async function fetchMilesProducts(
	airlineId: string,
): Promise<MilesProduct[]> {
	return db
		.select()
		.from(milesProducts)
		.where(eq(milesProducts.airlineId, airlineId));
}
