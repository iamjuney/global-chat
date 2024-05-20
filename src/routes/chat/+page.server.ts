import { PROFANITY_FILTER } from '$env/static/private';
import { db } from '$lib/supabase/db';
import { TB_chats } from '$lib/supabase/schema';
import { fail, redirect } from '@sveltejs/kit';
import { desc } from 'drizzle-orm';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		redirect(302, '/');
	}

	const messages = await db.select().from(TB_chats).orderBy(desc(TB_chats.createdAt)).limit(10);

	return {
		user: event.locals.user,
		messages
	};
};

// Define the schema for the message form
const messageSchema = z.object({
	message: z.string().min(2).max(1000),
	replied_to_username: z.string().optional(),
	replied_to_message: z.string().optional()
});

export const actions: Actions = {
	default: async ({ request, fetch, locals }) => {
		// Check if the user is authorized
		if (!locals.user) {
			return fail(401, { message: 'Unauthorized' });
		}

		// Validate the form data
		const form = await superValidate(request, zod(messageSchema));
		if (!form.valid) {
			return fail(400, { message: 'Invalid search query' });
		}

		if (PROFANITY_FILTER) {
			// Check for profanity
			const response = await fetch('https://vector.profanity.dev', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ message: form.data.message })
			});

			if (!response.ok) {
				return fail(500, { message: 'Profanity check failed' });
			}

			const { isProfanity } = await response.json();

			if (isProfanity) {
				return fail(400, { message: 'Profanity detected' });
			}
		}

		// Create the new message object
		const newMessage = {
			username: locals.user.username,
			message: form.data.message,
			repliedToUsername: form.data.replied_to_username ?? '',
			repliedToMessage: form.data.replied_to_message ?? '',
			createdAt: new Date().toString()
		};

		try {
			// Insert the new message into the database
			await db.insert(TB_chats).values(newMessage);
		} catch (error) {
			return fail(500, { message: 'Failed to insert message' });
		}
	}
};
