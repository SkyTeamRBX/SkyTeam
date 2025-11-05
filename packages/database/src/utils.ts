import { AnyColumn, sql } from "drizzle-orm";

/**
 * SQL Increment Function
 * @param column - The column to increment,
 * @param value - The value to increment by
 * @returns The new value of the column
 */
export function increment(column: AnyColumn, value = 1) {
	return sql`${column} + ${value}`;
}


