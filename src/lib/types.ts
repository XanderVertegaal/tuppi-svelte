import type { characters_char$result, trainer_allChars$result } from "$houdini";

export type SignCardCharacter = Pick<trainer_allChars$result['allChars'][0], 'id' | 'unicode'>;

type Question =
  'hitt-2-eng-syll' | 'eng-2-hitt-syll'
  | 'hitt-2-eng-log' | 'eng-2-hitt-log'
  | 'hitt-2-eng-det' | 'eng-2-hitt-det';

export interface Exercise {
  id: number;
  character: characters_char$result;
  questionType: Question;
  correct: boolean;
  answers: string[];
}

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

export enum CharFilter {
  SYLL_CV = 'Syllabograms CV',
  SYLL_VC = 'Syllabograms VC',
  SYLL_CVC = 'Syllabograms CVC',
  LOG = 'Logograms',
  DET = 'Determiners'
}

export interface GameSettings {
  syllabograms: boolean;
  logograms: boolean;
  determiners: boolean;
  numberOfAlternatives: number
}