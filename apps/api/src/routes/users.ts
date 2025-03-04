import { Router } from 'express';
import { 
	fetchUserById, 
	fetchUserByUsername, 
	createUser,
	type SafeUser 
} from '@skyteam/database';
import { ApiError } from '../middleware/errorHandler';

export const userRouter = Router();

// Get user by ID
userRouter.get('/:id', async (req, res, next) => {
	try {
		const user = await fetchUserById(req.params.id);
		if (!user) {
			throw new ApiError(404, 'User not found');
		}
		res.json(user);
	} catch (error) {
		next(error);
	}
});

// Get user by username
userRouter.get('/username/:username', async (req, res, next) => {
	try {
		const user = await fetchUserByUsername(req.params.username);
		if (!user) {
			throw new ApiError(404, 'User not found');
		}
		res.json(user);
	} catch (error) {
		next(error);
	}
});

// Create new user
userRouter.post('/', async (req, res, next) => {
	try {
		const { username, email, password, avatarUrl } = req.body;

		// Basic validation
		if (!username || !email || !password) {
			throw new ApiError(400, 'Missing required fields', {
				required: ['username', 'email', 'password'],
			});
		}

		// In a real app, you'd hash the password here
		const passwordHash = password; // Replace with proper hashing

		const user = await createUser({
			username,
			email,
			passwordHash,
			avatarUrl,
		});

		res.status(201).json(user);
	} catch (error) {
		// Handle unique constraint violations
		if (error instanceof Error && error.message.includes('unique')) {
			next(new ApiError(409, 'Username or email already exists'));
			return;
		}
		next(error);
	}
});

// Example of protected route (add auth middleware in real app)
userRouter.patch('/:id', async (req, res, next) => {
	try {
		throw new ApiError(501, 'Not implemented');
	} catch (error) {
		next(error);
	}
}); 