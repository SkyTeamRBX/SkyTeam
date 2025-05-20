import express from 'express';
import helmet from 'helmet';
import { errorHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/requestLogger';
import { authenticate } from './middleware/authenticate';
import { Airline } from '@skyteam/database';

import { adminRouter } from './routes/admin';
import { userRouter } from './routes/users';
import { flightRouter } from './routes/flights';

declare global {
	namespace Express {
		interface Request {
			airline: Airline;
		}
	}
}

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(helmet()); // Security headers
app.use(express.json()); // Parse JSON bodies
app.use(requestLogger); // Log requests

// Administrator Routes
app.use('/admin', adminRouter);

// Airline Routes
app.use(authenticate); // Authenticate requests for Routes below
app.use('/api/users', userRouter);
app.use('/flights', flightRouter);

// Health check endpoint
app.get('/health', (req, res) => {
	res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling
app.use(errorHandler);

// Start server
app.listen(port, () => {
	console.log(`API server running at http://localhost:${port}`);
});
