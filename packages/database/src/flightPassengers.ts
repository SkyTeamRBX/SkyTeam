import { db } from "./db";
import { flightPassengers } from "./schema";
import { eq } from "drizzle-orm";
import { incrementMiles } from "./users";
import { addMilesTransaction } from "./miles";

export type FlightPassenger = typeof flightPassengers.$inferSelect;

export async function addPassengerToFlight(data: {
	flightId: string;
	userId: string;
	miles: number;
}): Promise<FlightPassenger> {
	const [passenger] = await Promise.all([
		db.insert(flightPassengers).values(data).returning(),
		incrementMiles(data.userId, data.miles),
		addMilesTransaction({
			userId: data.userId,
			amount: data.miles,
			type: "earn",
			source: "flight",
			flightId: data.flightId,
			note: "Miles earned from flight",
		}),
	]);
	return passenger[0];
}

export async function fetchFlightPassengers(
	flightId: string,
): Promise<FlightPassenger[]> {
	return db
		.select()
		.from(flightPassengers)
		.where(eq(flightPassengers.flightId, flightId));
}
