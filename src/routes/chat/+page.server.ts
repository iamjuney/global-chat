import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		redirect(302, '/');
	}

	return {
		user: event.locals.user
	};
};

export const actions: Actions = {};
