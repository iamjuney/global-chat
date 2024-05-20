import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { drizzle } from 'drizzle-orm/node-postgres';
import { integer, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import pg from 'pg';

const pool = new pg.Pool();
const db = drizzle(pool);

export const TB_users = pgTable('users', {
	id: varchar('id', {
		length: 255
	}).primaryKey(),
	github_id: integer('github_id').unique().notNull(),
	username: varchar('username').unique().notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull()
});

export const TB_chats = pgTable('chats', {
	id: serial('id').primaryKey(),
	message: text('message').default('').notNull(),
	username: varchar('username').notNull(),
	repliedToUsername: varchar('replied_to_username').default('').notNull(),
	repliedToMessage: text('replied_to_message').default('').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull()
});

export const TB_sessions = pgTable('sessions', {
	id: varchar('id', {
		length: 255
	}).primaryKey(),
	userId: varchar('user_id', {
		length: 255
	})
		.notNull()
		.references(() => TB_users.id),
	expiresAt: timestamp('expires_at', {
		withTimezone: true,
		mode: 'date'
	}).notNull()
});

export const adapter = new DrizzlePostgreSQLAdapter(db, TB_sessions, TB_users);
