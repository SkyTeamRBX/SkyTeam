import { pgTable, text, timestamp, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	userId: text('user_id').primaryKey(),
	username: text('username').notNull().unique(),
	displayName: text('display_name').notNull(),
	miles: integer('miles').notNull().default(0),
	avatarUrl: text('avatar_url'),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull(),
}); 