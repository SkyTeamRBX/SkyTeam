import { Router } from "express";

const router = Router();

// Checks token validity and miles availability
router.get("/status", async (_req, res) => {
	// airlineAuth runs before; if we're here, token is valid
	const airline = res.locals.safeAirline ?? res.locals.airline;
	// For now, miles system is considered available if server is up
	res.json({ ok: true, milesAvailable: true, airline });
});

export default router;
