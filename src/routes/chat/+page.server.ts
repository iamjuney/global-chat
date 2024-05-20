import { db } from '$lib/supabase/db';
import { TB_chats } from '$lib/supabase/schema';
import { fail, redirect } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		redirect(302, '/');
	}

	return {
		user: event.locals.user
	};
};

// min of two words, max of 1000 characters
const messageSchema = z.object({
	message: z.string().min(2).max(1000),
	replied_to_username: z.string().optional(),
	replied_to_message: z.string().optional()
});

export const actions: Actions = {
	send: async ({ request, fetch, locals }) => {
		if (!locals.user) {
			return fail(401, {
				message: 'Unauthorized'
			});
		}

		const form = await superValidate(request, zod(messageSchema));
		if (!form.valid) {
			return fail(400, {
				message: 'Invalid search query'
			});
		}

		// check for profanity
		const checkProfanity = await fetch('https://vector.profanity.dev', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ message: form.data.message })
		});

		if (!checkProfanity.ok) {
			return fail(500, {
				message: 'Profanity check failed'
			});
		}

		const { isProfanity } = await checkProfanity.json();

		if (isProfanity) {
			return fail(400, {
				message: 'Profanity detected'
			});
		}

		try {
			let newMessage: {
				userId: string;
				message: string;
				replied_to_username?: string;
				replied_to_message?: string;
			} = {
				userId: locals.user.id,
				message: form.data.message
			};

			if (form.data.replied_to_username) {
				newMessage.replied_to_username = form.data.replied_to_username;
				newMessage.replied_to_message = form.data.replied_to_message;
			}

			await db.insert(TB_chats).values(newMessage);
		} catch (error) {
			return fail(500, {
				message: 'Failed to insert message'
			});
		}
	}
};
