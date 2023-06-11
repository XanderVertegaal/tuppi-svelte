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
}

export enum Question {
	CUN_TO_TRANS_SYLL,
	TRANS_TO_CUN_SYLL,
	CUN_TO_TRANS_LOG,
	TRANS_TO_CUN_LOG,
	CUN_TO_TRANS_DET,
	TRANS_TO_CUN_DET
}

