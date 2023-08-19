import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load = async function () {
	// There is no view attached to this route. We need it for the form action.
	throw redirect(302, '/');
} satisfies PageServerLoad;

export const actions = {
	// Overwrite the session cookie on logout and redirect.
	default: async ({ cookies }) => {
		cookies.set('session', '', {
			path: '/',
			expires: new Date(0)
		});

		throw redirect(302, '/');
	}
} satisfies Actions;
