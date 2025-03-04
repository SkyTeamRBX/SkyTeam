import { pgTable, text, timestamp, integer, boolean, uuid } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	userId: text('userId').primaryKey(),
	username: text('username').notNull().unique(),
	displayName: text('displayName').notNull(),
	miles: integer('miles').notNull().default(0),
	avatarUrl: text('avatarUrl'),
	createdAt: timestamp('createdAt').defaultNow().notNull(),
	updatedAt: timestamp('updatedAt').defaultNow().notNull(),
});

export const airlines = pgTable('airlines', {
	airlineId: text('airlineId').primaryKey(),
	name: text('name').notNull(),
	createdAt: timestamp('createdAt').defaultNow().notNull(),
	updatedAt: timestamp('updatedAt').defaultNow().notNull(),
});

export const brands = pgTable('brands', {
	brandId: text('brandId').primaryKey(),
	airlineId: text('airlineId')
		.notNull()
		.references(() => airlines.airlineId),
	name: text('name').notNull(),
	code: text('code').notNull().unique(),
	isPrimary: boolean('isPrimary').notNull().default(false),
	logoUrl: text('logoUrl').default(
		'https://files.skyteam.dev/api/public/dl/kiLB84P2?inline=true'
	),
	accentColor: text('accentColor').notNull().default('#2ea5f7'),
	secondaryColor: text('secondaryColor').notNull().default('#242429'),
	elementColor: text('elementColor').notNull().default('#fbfbfb'),
});

export const flights = pgTable('flights', {
	id: uuid('id').defaultRandom().primaryKey(),
	code: text('code').notNull(),
	gameId: text('gameId').notNull(),
	aircraft: text('aircraft').notNull(),
	airlineId: text('airlineId').notNull().references(() => airlines.airlineId),
	brandId: text('brandId').notNull().references(() => brands.brandId),
	startTime: timestamp('startTime').defaultNow().notNull(),
	endTime: timestamp('endTime'),
	codeshareAirlineId: text('codeshareAirlineId').references(() => airlines.airlineId),
	departure: text('departure').notNull(),
	arrival: text('arrival').notNull(),
});

export const flightPassengers = pgTable('flight_passengers', {
	flightId: uuid('flightId')
		.notNull()
		.references(() => flights.id),
	userId: text('userId')
		.notNull()
		.references(() => users.userId),
	miles: integer('miles').notNull(),
	createdAt: timestamp('createdAt').defaultNow().notNull(),
});

