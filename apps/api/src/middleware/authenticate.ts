import { fetchAirlineByToken } from "@skyteam/database";
import { Request, Response, NextFunction } from "express";

export function authenticate(req: Request, res: Response, next: NextFunction) {
	const apiKey = req.headers["x-api-key"];

	if (!apiKey) {
		return res.status(400).json({
			error: {
				message: "No API key provided",
			},
		});
	}

	fetchAirlineByToken(apiKey as string).then((airline) => {
		if (!airline) {
			return res.status(401).json({
				error: {
					message: "Invalid API key",
				},
			});
		}

		req.airline = airline;
		next();
	});
}
