import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load = async function () {
	return {
		allChars: await prisma.character.findMany()
	};
} satisfies PageServerLoad;
