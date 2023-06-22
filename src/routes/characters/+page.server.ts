import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load = async function ({ locals }) {
	
	if (locals.user) {
		return {
			allChars: await prisma.character.findMany({
				include: {
					detValues: true,
					logValues: true
				}
			}),
			userSignProgresses: await prisma.userSignProgress.findMany({
				where: {
					user: {
						id: locals.user.id
					}
				}, include: {
					signProgress: true
				}
			})
		}
	}

	return {
		allChars: await prisma.character.findMany({
			include: {
				detValues: true,
				logValues: true
			}
		})
	};

} satisfies PageServerLoad;
