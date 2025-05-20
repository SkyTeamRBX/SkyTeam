import { Router } from 'express';

export const airlinesRouter = Router();

airlinesRouter.post('/info', (req, res) => {
	res.json(req.airline);
});
