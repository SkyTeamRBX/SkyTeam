import { Router } from "express";
import {
	fetchUser,
	fetchUserFlights,
	fetchMilesProducts,
	spendMiles,
} from "@skyteam/database";

const router = Router();

// Fetch multiple users' data, expects body: { userIds: string[] } or [string, ...]
router.post("/users/fetchUsersData", async (req, res, next) => {
	try {
		let idsInput: unknown = req.body;
		let userIds: string[] = [];

		if (Array.isArray(idsInput)) {
			userIds = idsInput as string[];
		} else if (
			idsInput &&
			typeof idsInput === "object" &&
			Array.isArray((idsInput as any).userIds)
		) {
			userIds = (idsInput as any).userIds as string[];
		}

		userIds = (userIds || [])
			.map((v) => String(v || "").trim())
			.filter(Boolean);

		if (userIds.length === 0) {
			return res.status(400).json({
				error: "Provide a list of userIds in the request body",
			});
		}

		// De-duplicate to reduce queries while preserving original order mapping
		const uniqueIds = Array.from(new Set(userIds));

		const resultsMap = new Map<
			string,
			{
				user: Awaited<ReturnType<typeof fetchUser>>;
				flights: Awaited<ReturnType<typeof fetchUserFlights>>;
			}
		>();

		await Promise.all(
			uniqueIds.map(async (uid) => {
				const [user, flights] = await Promise.all([
					fetchUser(uid),
					fetchUserFlights(uid),
				]);
				resultsMap.set(uid, { user, flights });
			}),
		);

		// Build output aligned with requested order
		const data = userIds.map((uid) => {
			const entry = resultsMap.get(uid);
			if (!entry || !entry.user) {
				return { userId: uid, user: null, flights: [] };
			}
			return { userId: uid, user: entry.user, flights: entry.flights };
		});

		res.json({ data });
	} catch (err) {
		next(err);
	}
});

// Buy a miles product for a user
router.post("/user/:id/buyProduct", async (req, res, next) => {
	try {
		const { id: userId } = req.params;
		const { productId } = req.body as { productId?: string };
		if (!productId)
			return res.status(400).json({ error: "Missing productId in body" });

		const airline = res.locals.airline as { airlineId: string };
		const [user, products] = await Promise.all([
			fetchUser(userId),
			fetchMilesProducts(airline.airlineId),
		]);
		if (!user) return res.status(404).json({ error: "User not found" });

		const product = products.find(
			(p) => p.productId === productId && p.active !== false,
		);
		if (!product)
			return res.status(404).json({ error: "Product not found" });

		const updated = await spendMiles(
			userId,
			product.priceMiles,
			`Purchase: ${product.name}`,
		);

		res.json({ ok: true, user: updated, product });
	} catch (err) {
		if (err instanceof Error && err.message === "Insufficient miles") {
			return res.status(400).json({ error: "Insufficient miles" });
		}
		next(err);
	}
});

export default router;
