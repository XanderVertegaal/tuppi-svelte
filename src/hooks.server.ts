import prisma from '$lib/prisma';
import type { Handle } from '@sveltejs/kit';

export const handle = async function ({ event, resolve }) {
	const session = event.cookies.get('session');

	if (!session) {
		return await resolve(event);
	}

	const user = await prisma.user.findUnique({
		where: { userAuthToken: session },
		select: { username: true }
	});

	if (user) {
		event.locals.user = user;
	}

	return await resolve(event);
} satisfies Handle;
