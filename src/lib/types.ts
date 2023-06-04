import type { Question$options, allCharacters$result, getExercises$result } from '$houdini';

export type SignCardCharacter = Pick<allCharacters$result['allChars'][0], 'id' | 'unicode'>;
export type Exercise = getExercises$result['exercises'][number];
export type Answer = Exercise['answers'][number];
export type Mutable<T extends object> = { -readonly [K in keyof T]: T[K] };

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
	characterId: string;
	questionType: Question$options;
	correct: boolean;
}
[];
