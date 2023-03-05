type Question =
  'hitt-2-eng-syll' | 'eng-2-hitt-syll'
  | 'hitt-2-eng-log' | 'eng-2-hitt-log'
  | 'hitt-2-eng-det' | 'eng-2-hitt-det';

export interface simpleCharacter {
  cuneiform: string;
  latin: string;
}

export interface Exercise {
  id: number;
  character: FullCharacter;
  questionType: Question;
  correct: boolean;
  answers: string[];
}

export interface Logogram {
  logTransliteration: string;
  logTranslation: string;
}

export interface Determiner {
  detTransliteration: string;
  detTranslation: string;
}

export enum SignVariantCategory {
  DEFAULT = 'default',
  LATE = 'late',
  MIDDLE = 'middle',
  EARLY = 'early'
}

export enum FontSet {
  ULLIKUMMI_A = 'ullikummia',
  ULLIKUMMI_B = 'ullikummib', 
  ULLIKUMMI_C = 'ullikummic'
}

export interface SignComponents {
  vertical: number;
  horizontal: number;
  glossenkeil: number;
  diagonalAsc: number;
  diagonalDesc: number;
}
  
export interface SignVariant {
  category: SignVariantCategory;
  fontset: FontSet;
  components: SignComponents
}

export interface Cuneiform {
  unicode: string;
  variants: SignVariant[];
}

type OptionalVariants = Omit<Partial<SignVariant>, 'components'> & {components: Partial<SignComponents>}
  
type OptionalCuneiform = Omit<Cuneiform, 'variants'> 
  & {
  variants: OptionalVariants[];
}

export type CharProps = Omit<FullCharacter, 'cuneiform' | 'syllabograph' | 'logograph' | 'determiner'>
  & Partial<Pick<FullCharacter, 'syllabograph' | 'logograph' | 'determiner'>>
  & { cuneiform: OptionalCuneiform; }

export interface FullCharacter {
  id: number;
  cuneiform: Cuneiform;
  syllabograph: string[];
  logograph: Logogram[];
  determiner: Determiner[];
}

export enum CounterAction { INCREMENT, DECREMENT };

export type Dimension = keyof SignComponents;

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