import { Sign, type SignProgress } from '@prisma/client';
import type { GameResult } from './types';
import prisma from './prisma';

export async function interpretGameResults(results: GameResult[], userId: number): Promise<SignProgress[]> {
	const uniqueChars = [...new Set(results.map(result => result.characterId))];

	const existingUserSignProgresses = await prisma.userSignProgress.findMany({
		where: {
			userId,
			characterId: {
				in: uniqueChars
			}
		}
	});

	if (existingUserSignProgresses.length !== uniqueChars.length) {
		// Some characters are missing.
		return [];
	}

	const promises = existingUserSignProgresses.map(async (userSignProgress) => {
		const syllProgress = await findOrCreateNewSignProgress(Sign.SYLLABOGRAM, userSignProgress.id);
		const logProgress = await findOrCreateNewSignProgress(Sign.LOGOGRAM, userSignProgress.id);
		const detProgress = await findOrCreateNewSignProgress(Sign.DETERMINATIVE, userSignProgress.id);

		const syllResults = results.filter(result => result.characterId === userSignProgress.characterId && result.questionType.endsWith('SYLL'));
		const logResults = results.filter(result => result.characterId === userSignProgress.characterId && result.questionType.endsWith('LOG'));
		const detResults = results.filter(result => result.characterId === userSignProgress.characterId && result.questionType.endsWith('DET'));

		const signProgresses: SignProgress[] = [];

		if (syllProgress && syllResults.length > 0) {
			const newSyllLevel = calculateNewRank(syllProgress, syllResults);
			signProgresses.push(await prisma.signProgress.update({
				where: {
					id: syllProgress.id
				},
				data: {
					mastery: newSyllLevel,
					seen: {
						increment: 1
					}
				}
			}));
		}

		if (logProgress && logResults.length > 0) {
			const newLogLevel = calculateNewRank(logProgress, logResults);
			signProgresses.push(await prisma.signProgress.update({
				where: {
					id: logProgress.id
				},
				data: {
					mastery: newLogLevel
				}
			}));
		}

		if (detProgress && detResults.length > 0) {
			const newDetLevel = calculateNewRank(detProgress, detResults);
			signProgresses.push(await prisma.signProgress.update({
				where: {
					id: detProgress.id
				},
				data: {
					mastery: newDetLevel
				}
			}));
		}
		return signProgresses;
	});
	const awaited = await Promise.all(promises);
	return awaited.flat();
}


function calculateNewRank(progress: SignProgress, results: GameResult[]): number {
	const currentRank = progress.mastery;
	const numberOfIncorrect = results.filter(result => result.correct === false).length;
	
	// Stay at highest level
	if (numberOfIncorrect === 0 && currentRank === 8) {
		return 8;
	}

	// Stay at lowest level
	if (numberOfIncorrect !== 0 && currentRank === 1) {
		return 1;
	}

	// Level up
	if (numberOfIncorrect === 0 && currentRank < 8) {
		return currentRank + 1;
	}

	// Level down
	const incorrectFactor = Math.ceil(numberOfIncorrect / 2);
	const penaltyFactor = currentRank >= 5 ? 2 : 1;

	const newRank = Math.max(1, currentRank - incorrectFactor * penaltyFactor);
	return newRank;
}

async function findOrCreateNewSignProgress(sign: Sign, userSignProgressId: number): Promise<SignProgress> {
	return await prisma.signProgress.upsert({
		where: {
			userSignProgressId_sign: { userSignProgressId, sign }
		},
		update: {},
		create: {
			userSignProgressId,
			sign,
			mastery: 1,
			nextReview: new Date()
		}
	});
}