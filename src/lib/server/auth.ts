import { dev } from '$app/environment';
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '$env/static/private';
import { db } from '$lib/supabase/db';
import { TB_sessions, TB_users } from '$lib/supabase/schema';
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { GitHub } from 'arctic';
import { Lucia } from 'lucia';

export const github = new GitHub(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET);

const adapter = new DrizzlePostgreSQLAdapter(db, TB_sessions, TB_users);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: !dev
		}
	},
	getUserAttributes: (attributes) => {
		return {
			// attributes has the type of DatabaseUserAttributes
			githubId: attributes.github_id,
			username: attributes.username
		};
	}
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	github_id: number;
	username: string;
}
