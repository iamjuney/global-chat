import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import type { Actions, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';

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
	message: z.string().min(2).max(1000)
});

export const actions: Actions = {
	send: async ({ request, fetch }) => {
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
	}
};
