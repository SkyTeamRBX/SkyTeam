import { Router } from "express";
import { fetchMilesProducts } from "@skyteam/database";

const router = Router();

// Return airline data excluding token
router.get("/airline", async (_req, res, next) => {
	try {
		const safeAirline = res.locals.safeAirline ?? res.locals.airline;
		res.json(safeAirline);
	} catch (err) {
		next(err);
	}
});

// Return airline's products
router.get("/airline/fetchProductsData", async (_req, res, next) => {
	try {
		const airline = res.locals.airline as { airlineId: string };
		const products = await fetchMilesProducts(airline.airlineId);
		res.json(products);
	} catch (err) {
		next(err);
	}
});

export default router;
