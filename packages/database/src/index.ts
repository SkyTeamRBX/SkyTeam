import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { UTApi, UTFile } from "uploadthing/server";
import { createId } from '@paralleldrive/cuid2';
import { users, airlines, brands, flights, flightPassengers } from './schema';
import { eq, and, AnyColumn, sql, isNull } from 'drizzle-orm';

// Initialize the Postgres client
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
	throw new Error('DATABASE_URL environment variable is not set');
}

const client = postgres(connectionString);
const utapi = new UTApi();
export const db = drizzle(client);

export type User = typeof users.$inferSelect;
export type Airline = typeof airlines.$inferSelect;
export type Brand = typeof brands.$inferSelect;
export type Flight = typeof flights.$inferSelect;
export type FlightPassenger = typeof flightPassengers.$inferSelect;

/**
 * SQL Increment Function
 * @param column - The column to increment,
 * @param value - The value to increment by
 * @returns The new value of the column
 */
export function increment(column: AnyColumn, value = 1) {
	return sql`${column} + ${value}`;
}

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
	const result = await db.insert(users).values(data).returning();

	return result[0];
}

/**
 * Increments the miles for a user
 * @param userId - The Roblox user ID of the user to update
 * @param amount - The amount of miles to increment by (defaults to 1)
 * @returns Promise resolving to the updated User if found, null otherwise
 */
export async function incrementMiles(userId: string, amount = 1): Promise<User | null> {
	const result = await db
		.update(users)
		.set({ miles: increment(users.miles, amount) })
		.where(eq(users.userId, userId))
		.returning();

	return result[0] || null;
}

// Airline functions
/**
 * Fetches an airline by its ID from the database
 * @param airlineId - The airline ID to look up
 * @returns Promise resolving to the Airline if found, null otherwise
 */
export async function fetchAirline(airlineId: string): Promise<Airline | null> {
    const result = await db
        .select()
        .from(airlines)
        .where(eq(airlines.airlineId, airlineId))
        .limit(1);
    return result[0] || null;
}

/**
 * Fetches all airlines from the database
 * @returns Promise resolving to an array of Airlines
 */
export async function fetchAllAirlines(): Promise<Airline[]> {
	return db.select().from(airlines);
}

/**
 * Fetches an airline by its authentication token
 * @param token - The airline token to look up
 * @returns Promise resolving to the Airline if found, null otherwise
 */
export async function fetchAirlineByToken(token: string): Promise<Airline | null> {
    const result = await db.select().from(airlines).where(eq(airlines.token, token)).limit(1);
    return result[0] || null;
}

/**
 * Creates a new airline in the database
 * @param data - Object containing airline data (airlineId, name)
 * @returns Promise resolving to the newly created Airline
 */
export async function createAirline(data: { airlineId: string; name: string }): Promise<Airline> {
    const newData = {
        ...data,
        token: createId(),
    };

    const result = await db.insert(airlines).values(newData).returning();

    return result[0];
}

// Brand functions
/**
 * Fetches all brands from the database
 * @returns Promise resolving to an array of Brands
 */
export async function fetchAllBrands(): Promise<Brand[]> {
	return db.select().from(brands);
}

/**
 * Fetches a brand by its ID from the database
 * @param brandId - The brand ID to look up
 * @returns Promise resolving to the Brand if found, null otherwise
 */
export async function fetchBrand(brandId: string): Promise<Brand | null> {
    const result = await db.select().from(brands).where(eq(brands.brandId, brandId)).limit(1);
    return result[0] || null;
}

/**
 * Fetches a brand by its IATA from the database
 * @param iata - The brand IATA to look up
 * @returns Promise resolving to the Brand if found, null otherwise
 */
export async function fetchBrandByIATA(iata: string): Promise<Brand | null> {
    const result = await db.select().from(brands).where(eq(brands.iata, iata)).limit(1);
    return result[0] || null;
}

/**
 * Fetches all brands associated with a specific airline
 * @param airlineId - The airline ID to fetch brands for
 * @returns Promise resolving to an array of Brands
 */
export async function fetchAirlineBrands(airlineId: string): Promise<Brand[]> {
    return db.select().from(brands).where(eq(brands.airlineId, airlineId));
}

/**
 * Fetches the primary brand for a specific airline
 * @param airlineId - The airline ID to fetch the primary brand for
 * @returns Promise resolving to the primary Brand if found, null otherwise
 */
export async function fetchPrimaryBrand(airlineId: string): Promise<Brand | null> {
    const result = await db
        .select()
        .from(brands)
        .where(and(eq(brands.airlineId, airlineId), eq(brands.isPrimary, true)))
        .limit(1);

    return result[0] || null;
}

/**
 * Creates a new brand in the database
 * @param data - Object containing brand data (brandId, airlineId, name, code, and styling options)
 * @returns Promise resolving to the newly created Brand
 */
export async function createBrand(data: {
    brandId: string;
    airlineId: string;
    name: string;
	iata: string
    icao: string;
	callsign: string
	isPrimary?: boolean;
    logoUrl?: string;
    accentColor: string;
    secondaryColor: string;
    elementColor: string;
}): Promise<Brand> {
    const result = await db.insert(brands).values(data).returning();

    return result[0];
}

// Flight functions
/**
 * Fetches a flight by its ID from the database
 * @param id - The flight ID to look up
 * @returns Promise resolving to the Flight if found, null otherwise
 */
export async function fetchFlight(id: string): Promise<Flight | null> {
    const result = await db.select().from(flights).where(eq(flights.id, id)).limit(1);
    return result[0] || null;
}

/**
 * Fetches all flights for a specific airline
 * @param airlineId - The airline ID to fetch flights for
 * @returns Promise resolving to an array of Flights
 */
export async function fetchFlightsByAirline(airlineId: string): Promise<Flight[]> {
    return db.select().from(flights).where(eq(flights.airlineId, airlineId));
}

/**
 * Fetches upcoming flights for a specific airline (flights that haven't ended)
 * @param airlineId - The airline ID to fetch upcoming flights for
 * @returns Promise resolving to an array of Flights sorted by start time
 */
export async function fetchComingFlights(airlineId: string): Promise<Flight[]> {
    return db
        .select()
        .from(flights)
        .where(and(eq(flights.airlineId, airlineId), isNull(flights.endTime)))
        .orderBy(flights.startTime);
}

/**
 * Creates a new flight in the database
 * @param data - Object containing flight data (code, gameId, aircraft, airlineId, brandId, departure, arrival, optional codeshareAirlineId)
 * @returns Promise resolving to the newly created Flight
 */
export async function createFlight(data: {
    code: string;
    gameId: string;
    aircraft: string;
    airlineId: string;
    brandId: string;
    departure: string;
    arrival: string;
    codeshareAirlineId?: string;
}): Promise<Flight> {
    const result = await db.insert(flights).values(data).returning();
    return result[0];
}

/**
 * Marks a flight as started by setting startedAt to the current date
 * @param id - The ID of the flight to start
 * @returns Promise resolving to the updated Flight if found, null otherwise
 */
export async function startFlight(id: string): Promise<Flight | null> {
    const result = await db
        .update(flights)
        .set({ startedAt: new Date() })
        .where(eq(flights.id, id))
        .returning();
    return result[0] || null;
}

/**
 * Marks a flight as ended by setting its endTime to the current date
 * @param id - The ID of the flight to end
 * @returns Promise resolving to the updated Flight if found, null otherwise
 */
export async function endFlight(id: string): Promise<Flight | null> {
    const result = await db
        .update(flights)
        .set({ endTime: new Date() })
        .where(eq(flights.id, id))
        .returning();
    return result[0] || null;
}

// Flight Passenger functions
/**
 * Adds a passenger to a flight and increments their miles
 * @param data - Object containing passenger data (flightId, userId, miles)
 * @returns Promise resolving to the newly created FlightPassenger
 */
export async function addPassengerToFlight(data: {
    flightId: string;
    userId: string;
    miles: number;
}): Promise<FlightPassenger> {
    const [passenger, user] = await Promise.all([
        db.insert(flightPassengers).values(data).returning(),
        incrementMiles(data.userId, data.miles),
    ]);

    return passenger[0];
}

/**
 * Fetches all passengers for a specific flight
 * @param flightId - The flight ID to fetch passengers for
 * @returns Promise resolving to an array of FlightPassengers
 */
export async function fetchFlightPassengers(flightId: string): Promise<FlightPassenger[]> {
    return db.select().from(flightPassengers).where(eq(flightPassengers.flightId, flightId));
}

/**
 * Fetches all flights a user has been on with their earned miles
 * @param userId - The user ID to fetch flights for
 * @returns Promise resolving to an array of Flights with an additional miles property
 */
export async function fetchUserFlights(userId: string): Promise<(Flight & { miles: number })[]> {
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
            miles: flightPassengers.miles,
        })
        .from(flights)
        .innerJoin(flightPassengers, eq(flights.id, flightPassengers.flightId))
        .where(eq(flightPassengers.userId, userId));

    return result;
}

// Export schema and types
export * from './schema';
