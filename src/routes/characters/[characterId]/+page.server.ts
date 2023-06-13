import prisma from '$lib/prisma.js';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = async function ({ params }) {
	const charId = parseInt(params.characterId);

	if (charId < 1) {
		throw redirect(302, '/characters/1');
	}

	if (charId > 15) {
		throw redirect(302, '/characters/8');
	}

	const character = await prisma.character.findUnique({
		where: {
			id: charId
		},
		include: {
			variants: true,
			logValues: true,
			detValues: true
		}
	});

	return { character };
} satisfies PageServerLoad;
