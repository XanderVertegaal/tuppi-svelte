import { Prisma } from '@prisma/client';
import prisma from './prisma';
import { Question, type Exercise, type GameSettingsInput, type CharacterWithLogDet } from './types';

function shuffleArray<T>(array: T[]): T[] {
	return array.sort(() => Math.random() - 0.5);
}

function getRandomItemsFromArray<T>(array: T[], numberOfItems: number): T[] {
	return shuffleArray(array).slice(0, numberOfItems);
}

type CharacterResult = {
	id: number;
	character: CharacterWithLogDet | null;
};

type AlternativeCharacterResult = {
	id: number;
	characters: CharacterWithLogDet[];
	type: SignType;
};

type SignType = 'syll' | 'log' | 'det';

async function getAlternativeCharacters(
	characterId: number,
	numberOfAlternatives: number,
	type: SignType
): Promise<AlternativeCharacterResult> {
	const alternativeIds = await prisma.character
		.findMany({
			where: {
				id: {
					not: characterId // exclude the character itself
				},
				...(type === 'syll' ? { syllValues: { isEmpty: false } } : {}),
				...(type === 'log' ? { logValues: { some: {} } } : {}), // isEmpty is unavailable for non-scalar lists
				...(type === 'det' ? { detValues: { some: {} } } : {})
			},
			include: {
				logValues: true,
				detValues: true
			}
		})
		.then((characters) => characters.map((character) => character.id));

	const randomIds = getRandomItemsFromArray(alternativeIds, numberOfAlternatives);

	const randomCharacters = await prisma.character.findMany({
		where: {
			id: {
				in: randomIds
			}
		},
		include: {
			logValues: true,
			detValues: true
		}
	});

	return {
		id: characterId,
		characters: randomCharacters,
		type
	};
}

async function getCharacter(id: number): Promise<CharacterResult> {
	const character = await prisma.character.findUnique({
		where: { id },
		include: {
			logValues: true,
			detValues: true
		}
	});

	return {
		id,
		character
	};
}

type ExerciseReturnType = Omit<Exercise, 'character'> & { character: CharacterWithLogDet };

export async function createExercises(
	gameSettings: GameSettingsInput
): Promise<ExerciseReturnType[]> {
	const exercises: ExerciseReturnType[] = [];
	const promises: Promise<CharacterResult | AlternativeCharacterResult>[] = [];

	gameSettings.selectedIds.forEach((id) => {
		const characterQuery = getCharacter(id);
		promises.push(characterQuery);

		if (gameSettings.inclSyll) {
			const syllAlternativeCharsQuery = getAlternativeCharacters(
				id,
				gameSettings.numberOfAlternatives,
				'syll'
			);
			promises.push(syllAlternativeCharsQuery);
		}
		if (gameSettings.inclLog) {
			const logAlternativeCharsQuery = getAlternativeCharacters(
				id,
				gameSettings.numberOfAlternatives,
				'log'
			);
			promises.push(logAlternativeCharsQuery);
		}
		if (gameSettings.inclDet) {
			const detAlternativeCharsQuery = getAlternativeCharacters(
				id,
				gameSettings.numberOfAlternatives,
				'det'
			);
			promises.push(detAlternativeCharsQuery);
		}
	});

	await Promise.all(promises).then((promiseResults) => {
		promiseResults.forEach((result) => {
			const id = result.id;

			// Return if an exercise already exists for this character.
			if (exercises.find((exercise) => exercise.character.id === id)) {
				return;
			}

			// Find the character (correct answer)
			const characterResult = promiseResults.find(
				(result) => 'character' in result && result.id === id
			) as CharacterResult;

			// Find alternative characters (incorrect answers)
			const alternativeCharsResult = promiseResults.filter(
				(result) => 'characters' in result && result.id === id
			) as AlternativeCharacterResult[];

			const character = characterResult.character;
			if (!character) {
				return;
			}

			if (gameSettings.inclSyll && character.syllValues.length > 0) {
				const syllAlternativeCharsResult = alternativeCharsResult.find((result) => result.type === 'syll');
				if (!syllAlternativeCharsResult) {
					return;
				}

				exercises.push(
					{
						character,
						answers: shuffleArray(
							syllAlternativeCharsResult.characters
								.map((char) => ({
									correct: false,
									displayValue: char.syllValues.join(', ')
								}))
								.concat([{ correct: true, displayValue: character.syllValues.join(', ') }])
						),
						correct: false,
						questionType: Question.CUN_TO_TRANS_SYLL
					},
					{
						character,
						answers: shuffleArray(
							syllAlternativeCharsResult.characters
								.map((char) => ({ correct: false, displayValue: char.unicode }))
								.concat([{ correct: true, displayValue: character.unicode }])
						),
						correct: false,
						questionType: Question.TRANS_TO_CUN_SYLL
					}
				);
			}

			if (gameSettings.inclDet && character.detValues.length > 0) {
				const detAlternativeCharsResult = alternativeCharsResult.find(
					(result) => result.type === 'det'
				);
				if (!detAlternativeCharsResult) {
					return;
				}

				exercises.push(
					{
						character,
						answers: shuffleArray(
							detAlternativeCharsResult.characters
								.map((char) => ({
									correct: false,
									displayValue: char.detValues
										.map((detValue) => detValue.detTransliteration)
										.join(', ')
								}))
								.concat([
									{
										correct: true,
										displayValue: character.detValues
											.map((detValue) => detValue.detTransliteration)
											.join(', ')
									}
								])
						),
						correct: false,
						questionType: Question.CUN_TO_TRANS_DET
					},
					{
						character,
						answers: shuffleArray(
							detAlternativeCharsResult.characters
								.map((char) => ({ correct: false, displayValue: char.unicode }))
								.concat([{ correct: true, displayValue: character.unicode }])
						),
						correct: false,
						questionType: Question.TRANS_TO_CUN_DET
					}
				);
			}

			if (gameSettings.inclLog && character.logValues.length > 0) {
				const logAlternativeCharsResult = alternativeCharsResult.find(
					(result) => result.type === 'log'
				);
				if (!logAlternativeCharsResult) {
					return;
				}

				exercises.push(
					{
						character,
						answers: shuffleArray(
							logAlternativeCharsResult.characters
								.map((char) => ({
									correct: false,
									displayValue: char.logValues
										.map((logValue) => logValue.logTransliteration)
										.join(', ')
								}))
								.concat([
									{
										correct: true,
										displayValue: character.logValues
											.map((logValue) => logValue.logTransliteration)
											.join(', ')
									}
								])
						),
						correct: false,
						questionType: Question.CUN_TO_TRANS_LOG
					},
					{
						character,
						answers: shuffleArray(
							logAlternativeCharsResult.characters
								.map((char) => ({ correct: false, displayValue: char.unicode }))
								.concat([{ correct: true, displayValue: character.unicode }])
						),
						correct: false,
						questionType: Question.TRANS_TO_CUN_LOG
					}
				);
			}
		});
		return shuffleArray(exercises);
	});

	return exercises;
}
