import { fail, redirect } from '@sveltejs/kit';
import type { Action, Actions, PageServerLoad } from './$types';
import prisma from '$lib/prisma';
import bcrypt from 'bcrypt';

export const load = async function ({ locals }) {
  // Redirect the user if they are already logged in.
  if (locals.user) {
    throw redirect(302, '/')
  }
} satisfies PageServerLoad;

export const actions = {
	register: async ({ request }) => {
		const data = await request.formData();
		const username = data.get('username');
		const password = data.get('password');

		if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
			return fail(400, { invalid: true });
		}

		const user = await prisma.user.findUnique({
			where: { username }
		});

		// User already exists.
		if (user) {
			return fail(400, { user: true });
		}

		await prisma.user.create({
			data: {
				username,
				passwordHash: await bcrypt.hash(password, 10),
				userAuthToken: crypto.randomUUID()
			}
		});

		throw redirect(303, '/login');
	}
} satisfies Actions;
