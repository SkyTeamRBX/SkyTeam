import express from 'express';
import helmet from 'helmet';
import { userRouter } from './routes/users';
import { errorHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/requestLogger';

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(helmet()); // Security headers
app.use(express.json()); // Parse JSON bodies
app.use(requestLogger); // Log requests

// Routes
app.use('/api/users', userRouter);

// Health check endpoint
app.get('/health', (req, res) => {
	res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling
app.use(errorHandler);

// Start server
app.listen(port, () => {
	console.log(`🚀 API server running at http://localhost:${port}`);
});
