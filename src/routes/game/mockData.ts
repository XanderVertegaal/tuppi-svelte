import { Question, type GameResult } from '$lib/types';

export const mockGameResults: GameResult[] = [
	{
		characterId: 2,
		questionType: Question.CUN_TO_TRANS_SYLL,
		correct: false
	},
	{
		characterId: 1,
		questionType: Question.CUN_TO_TRANS_LOG,
		correct: false
	},
	{
		characterId: 1,
		questionType: Question.TRANS_TO_CUN_SYLL,
		correct: false
	},
	{
		characterId: 1,
		questionType: Question.CUN_TO_TRANS_SYLL,
		correct: false
	},
	{
		characterId: 2,
		questionType: Question.TRANS_TO_CUN_LOG,
		correct: true
	},
	{
		characterId: 2,
		questionType: Question.CUN_TO_TRANS_LOG,
		correct: true
	},
	{
		characterId: 1,
		questionType: Question.TRANS_TO_CUN_LOG,
		correct: true
	},
	{
		characterId: 2,
		questionType: Question.TRANS_TO_CUN_SYLL,
		correct: true
	},
	{
		characterId: 2,
		questionType: Question.CUN_TO_TRANS_SYLL,
		correct: true
	},
	{
		characterId: 1,
		questionType: Question.CUN_TO_TRANS_LOG,
		correct: true
	},
	{
		characterId: 1,
		questionType: Question.TRANS_TO_CUN_SYLL,
		correct: true
	},
	{
		characterId: 1,
		questionType: Question.CUN_TO_TRANS_SYLL,
		correct: true
	}
];
