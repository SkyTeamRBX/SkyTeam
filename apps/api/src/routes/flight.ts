import { Router } from "express";
import {
	fetchComingFlights,
	startFlight,
	endFlight,
	fetchAirlineBrands,
} from "@skyteam/database";

const router = Router();

// Upcoming flights for the airline, including brand info
router.get("/flight/fetchUpcomingFlights", async (_req, res, next) => {
	try {
		const airline = res.locals.airline as { airlineId: string };

		const [flights, brands] = await Promise.all([
			fetchComingFlights(airline.airlineId),
			fetchAirlineBrands(airline.airlineId),
		]);

		const brandsById = new Map(brands.map((b) => [b.brandId, b]));
		const withBrand = flights.map((f) => ({
			...f,
			brand: brandsById.get(f.brandId) || null,
		}));

		res.json(withBrand);
	} catch (err) {
		next(err);
	}
});

// Set startedAt
router.post("/flight/:id/serverStart", async (req, res, next) => {
	try {
		const { id } = req.params;
		const updated = await startFlight(id);
		if (!updated)
			return res.status(404).json({ error: "Flight not found" });
		res.json(updated);
	} catch (err) {
		next(err);
	}
});

// Heartbeat: for now, acknowledge receipt. Schema lacks lastPingAt to persist.
router.post("/flight/:id/tick", async (req, res, next) => {
	try {
		const { id } = req.params;
		// In future: persist lastPingAt and auto-end if stale
		res.json({ ok: true, flightId: id, message: "tick received" });
	} catch (err) {
		next(err);
	}
});

// Set endTime
router.post("/flight/:id/serverEnd", async (req, res, next) => {
	try {
		const { id } = req.params;
		const updated = await endFlight(id);
		if (!updated)
			return res.status(404).json({ error: "Flight not found" });
		res.json(updated);
	} catch (err) {
		next(err);
	}
});

export default router;
