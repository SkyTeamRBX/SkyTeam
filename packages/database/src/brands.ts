import { db } from "./db";
import { brands } from "./schema";
import { eq, and } from "drizzle-orm";

export type Brand = typeof brands.$inferSelect;

export async function fetchAllBrands(): Promise<Brand[]> {
	return db.select().from(brands);
}

export async function fetchBrand(brandId: string): Promise<Brand | null> {
	const result = await db.select().from(brands).where(eq(brands.brandId, brandId)).limit(1);
	return result[0] || null;
}

export async function fetchBrandByIATA(iata: string): Promise<Brand | null> {
	const result = await db.select().from(brands).where(eq(brands.iata, iata)).limit(1);
	return result[0] || null;
}

export async function fetchAirlineBrands(airlineId: string): Promise<Brand[]> {
	return db.select().from(brands).where(eq(brands.airlineId, airlineId));
}

export async function fetchPrimaryBrand(airlineId: string): Promise<Brand | null> {
	const result = await db
		.select()
		.from(brands)
		.where(and(eq(brands.airlineId, airlineId), eq(brands.isPrimary, true)))
		.limit(1);
	return result[0] || null;
}

export async function createBrand(data: {
	brandId: string;
	airlineId: string;
	name: string;
	iata: string;
	icao: string;
	callsign: string;
	isPrimary?: boolean;
	logoUrl?: string;
	accentColor: string;
	secondaryColor: string;
	elementColor: string;
}): Promise<Brand> {
	const result = await db.insert(brands).values(data).returning();
	return result[0];
}


