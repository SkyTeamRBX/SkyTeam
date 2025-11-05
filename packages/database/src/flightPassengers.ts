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
	return await db.transaction(async (tx) => {
		const inserted = await tx.insert(flightPassengers).values(data).returning();
		await incrementMiles(data.userId, data.miles, tx);
		await addMilesTransaction(
			{
				userId: data.userId,
				amount: data.miles,
				type: "earn",
				source: "flight",
				flightId: data.flightId,
				note: "Miles earned from flight",
			},
			tx,
		);
		return inserted[0];
	});
}

export async function fetchFlightPassengers(
	flightId: string,
): Promise<FlightPassenger[]> {
	return db
		.select()
		.from(flightPassengers)
		.where(eq(flightPassengers.flightId, flightId));
}
