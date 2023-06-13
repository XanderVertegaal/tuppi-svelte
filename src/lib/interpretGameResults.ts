import type { UserSignProgress } from '@prisma/client';
import type { GameResult } from './types';
import prisma from './prisma';

export async function interpretGameResults(
	results: GameResult[],
	userId: number
): Promise<UserSignProgress[]> {
	const uniqueChars = [...new Set(results.map((result) => result.characterId))];

	const updatedOrCreatedSignProgresses = await Promise.all(
		uniqueChars.map(async (characterId) => {
			const hasOneIncorrect = results
				.filter((result) => result.characterId === characterId)
				.map((result) => result.correct)
				.includes(false);

			const existingUserSignProgress = await prisma.userSignProgress.findUnique({
				where: {
					userId_characterId: { characterId, userId }
				}
			});

			// Update existing
			if (existingUserSignProgress) {
				const newProgress = hasOneIncorrect
					? Math.min(100, existingUserSignProgress.progress + 10)
					: Math.max(0, existingUserSignProgress.progress - 10);

				return prisma.userSignProgress.update({
					where: {
						userId_characterId: {
							characterId: existingUserSignProgress.characterId,
							userId: existingUserSignProgress.userId
						}
					},
					data: {
						progress: newProgress
					}
				});
			}

			return prisma.userSignProgress.create({
				data: {
					characterId,
					progress: hasOneIncorrect ? 10 : 0,
					userId: userId
				}
			});
		})
	);
	return updatedOrCreatedSignProgresses;
}
