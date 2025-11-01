import { Request, Response, NextFunction } from "express";

export class ApiError extends Error {
	constructor(
		public statusCode: number,
		message: string,
		public details?: any,
	) {
		super(message);
		this.name = "ApiError";
	}
}

export function errorHandler(
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction,
) {
	console.error("Error:", err);

	if (err instanceof ApiError) {
		return res.status(err.statusCode).json({
			error: {
				message: err.message,
				details: err.details,
			},
		});
	}

	// Default error response for unhandled errors
	return res.status(500).json({
		error: {
			message: "Internal Server Error",
			...(process.env.NODE_ENV === "development" && {
				details: err.message,
				stack: err.stack,
			}),
		},
	});
}
