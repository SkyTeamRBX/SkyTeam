import { Router } from 'express';
import { ApiError } from '../middleware/errorHandler';
import { Airline, fetchComingFlights } from '@skyteam/database';

export const flightRouter = Router();

flightRouter.post('/fetchComingFlights', async (req, res) => {
	try {
		const flights = await fetchComingFlights(req.airline.airlineId);
		res.json({ flights });
	} catch (error) {
		res.status(500).json({
			error: {
				message: 'Failed to fetch flights',
			},
		});
	}
});
