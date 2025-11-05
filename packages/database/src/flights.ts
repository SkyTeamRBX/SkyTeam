import { db } from "./db";
import { flights, flightPassengers } from "./schema";
import { eq, and, isNull } from "drizzle-orm";

export type Flight = typeof flights.$inferSelect;

export async function fetchFlight(id: string): Promise<Flight | null> {
	const result = await db
		.select()
		.from(flights)
		.where(eq(flights.id, id))
		.limit(1);
	return result[0] || null;
}

export async function fetchFlightsByAirline(
	airlineId: string,
): Promise<Flight[]> {
	return db.select().from(flights).where(eq(flights.airlineId, airlineId));
}

export async function fetchComingFlights(airlineId: string): Promise<Flight[]> {
	return db
		.select()
		.from(flights)
		.where(and(eq(flights.airlineId, airlineId), isNull(flights.endTime)))
		.orderBy(flights.startTime);
}

export async function createFlight(data: {
	code: string;
	gameId: string;
	aircraft: string;
	airlineId: string;
	brandId: string;
	departure: string;
	arrival: string;
	codeshareAirlineId?: string;
	discordEventLink?: string;
}): Promise<Flight> {
	const result = await db.insert(flights).values(data).returning();
	return result[0];
}

export async function startFlight(id: string): Promise<Flight | null> {
	const result = await db
		.update(flights)
		.set({ startedAt: new Date() })
		.where(eq(flights.id, id))
		.returning();
	return result[0] || null;
}

export async function endFlight(id: string): Promise<Flight | null> {
	const result = await db
		.update(flights)
		.set({ endTime: new Date() })
		.where(eq(flights.id, id))
		.returning();
	return result[0] || null;
}

export async function fetchUserFlights(
	userId: string,
): Promise<(Flight & { miles: number })[]> {
	const result = await db
		.select({
			id: flights.id,
			code: flights.code,
			gameId: flights.gameId,
			aircraft: flights.aircraft,
			airlineId: flights.airlineId,
			brandId: flights.brandId,
			startTime: flights.startTime,
			endTime: flights.endTime,
			codeshareAirlineId: flights.codeshareAirlineId,
			departure: flights.departure,
			arrival: flights.arrival,
			startedAt: flights.startedAt,
			discordEventLink: flights.discordEventLink,
			miles: flightPassengers.miles,
		})
		.from(flights)
		.innerJoin(flightPassengers, eq(flights.id, flightPassengers.flightId))
		.where(eq(flightPassengers.userId, userId));

	return result;
}
