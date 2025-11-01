import { Router } from "express";
import {
	fetchAllAirlines,
	createAirline,
	fetchAllBrands,
	createBrand,
} from "@skyteam/database";

export const adminRouter = Router();

adminRouter.use((req, res, next) => {
	if (req.header("x-token") !== process.env.ADMIN_JWT_SECRET) {
		return res.status(401).json({ error: "Unauthorized" });
	}
	next();
});

adminRouter.get("/fetchAirlines", async (req, res) => {
	res.json(await fetchAllAirlines());
});

/**
 * Body
 * {
        "airlineId": "AA",
        "name": "Brand Name",
    }
 */
adminRouter.post("/createAirline", async (req, res) => {
	const airline = await createAirline(req.body);
	res.json(airline);
});

// # BRANDS

adminRouter.get("/fetchBrands", async (req, res) => {
	res.json(await fetchAllBrands());
});

/**
 * Body
 * {
        "brandId": "brandname",
        "airlineId": "airline",
        "name": "Brand Name",
        "iata": "AA",
        "icao": "BA",
        "callsign": "CALLSIGN",
        "isPrimary": true,
        "logoUrl": "https://example.com/logo.png",
        "accentColor": "#2ea5f7",
        "secondaryColor": "#242429",
        "elementColor": "#fbfbfb"
    }
 */
adminRouter.post("/createBrand", async (req, res) => {
	const brand = await createBrand(req.body);
	res.json(brand);
});
