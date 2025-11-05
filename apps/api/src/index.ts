import express from "express";
import helmet from "helmet";
import cors from "cors";

import { airlineAuth } from "./middleware/auth";
import statusRouter from "./routes/status";
import airlineRouter from "./routes/airline";
import flightRouter from "./routes/flight";
import usersRouter from "./routes/users";

const app = express();

// Security & basics
app.use(helmet());
app.use(cors());
app.use(express.json());

// Public health (no auth) to diagnose server without DB
app.get("/health", (_req, res) => {
	res.json({ ok: true });
});

// Auth (all routes require a valid airline token via x-api-key)
app.use(airlineAuth);

// Routes
app.use(statusRouter);
app.use(airlineRouter);
app.use(flightRouter);
app.use(usersRouter);

// Health
app.get("/", (_req, res) => {
	res.json({ ok: true });
});

// Not found
app.use((req, res) => {
	res.status(404).json({ error: "Not Found", path: req.path });
});

// Error handler
app.use(
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	(
		err: any,
		_req: express.Request,
		res: express.Response,
		_next: express.NextFunction,
	) => {
		console.error("Unhandled error:", err);
		res.status(500).json({ error: "Internal Server Error" });
	},
);

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
app.listen(PORT, () => {
	console.log(`[api] listening on http://localhost:${PORT}`);
});
