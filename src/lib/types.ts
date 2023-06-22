import { Prisma, type Character } from '@prisma/client';

export interface SignComponents {
	vertical: number;
	horizontal: number;
	glossenkeil: number;
	diagonalAsc: number;
	diagonalDesc: number;
}

export enum GameState {
	PREPARING,
	RUNNING,
	FINISHED
}

export interface GameResult {
	characterId: number;
	questionType: Question;
	correct: boolean;
}

export interface GameSettingsInput {
	selectedIds: number[];
	numberOfAlternatives: number;
	inclDet: boolean;
	inclLog: boolean;
	inclSyll: boolean;
	cunToTranslit: boolean;
	translitToCun: boolean;
	multipleChoice: boolean;
	writtenExercise: boolean;
}

export enum Question {
	CUN_TO_TRANS_SYLL = 'CUN_TO_TRANS_SYLL',
	TRANS_TO_CUN_SYLL = 'TRANS_TO_CUN_SYLL',
	CUN_TO_TRANS_LOG = 'CUN_TO_TRANS_LOG',
	TRANS_TO_CUN_LOG = 'TRANS_TO_CUN_LOG',
	CUN_TO_TRANS_DET = 'CUN_TO_TRANS_DET',
	TRANS_TO_CUN_DET = 'TRANS_TO_CUN_DET'
}

export interface Exercise {
	answers: Answer[];
	character: Character;
	correct: boolean;
	questionType: Question;
}

export interface Answer {
	correct: boolean;
	displayValue: string;
}

const CharacterWithLogDet = Prisma.validator<Prisma.CharacterArgs>()({
	include: {
		logValues: true,
		detValues: true
	}
});

export type CharacterWithLogDet = Prisma.CharacterGetPayload<typeof CharacterWithLogDet>;