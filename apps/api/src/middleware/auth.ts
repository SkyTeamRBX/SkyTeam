import type { Request, Response, NextFunction } from "express";
import { fetchAirlineByToken } from "@skyteam/database";

export function safeAirline<T extends { token?: string }>(airline: T) {
	const { token, ...safe } = airline as any;
	return safe;
}

export async function airlineAuth(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const token = req.header("x-api-key");
		if (!token) {
			return res.status(401).json({ error: "Missing x-api-key header" });
		}

		const airline = await fetchAirlineByToken(token);
		if (!airline) {
			return res.status(401).json({ error: "Invalid API key" });
		}

		// Attach to locals for downstream handlers
		res.locals.airline = airline;
		res.locals.safeAirline = safeAirline(airline);

		return next();
	} catch (err) {
		return next(err);
	}
}
