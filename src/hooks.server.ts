import { setSession } from '$houdini';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const user = { name: 'Xander' };

	setSession(event, { user });

	const response = await resolve(event);
	return response;
};
