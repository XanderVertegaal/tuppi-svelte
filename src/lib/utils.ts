import type { SimilarCharData } from "../routes/components/+page";
import type { SimilarCharacters } from "../routes/components/proxy+page";
import { complexCharacters } from "./charMap";
import { type FullCharacter, type SignVariantCategory, type SignComponents, FontSet, type SignVariant, type Exercise, type GameSettings } from "./types";

export function renderUnicode(unicodeString: string): string {
  return String.fromCodePoint(parseInt(unicodeString, 16));
}

const getTypedKeys = Object.keys as <T extends object>(obj: T) => Array<keyof T>;

export function componentsMatch(base: SignComponents | null, other: SignComponents): boolean {
  if (base === null) {
    return false;
  }
  return getTypedKeys(base).every(key => base[key] === other[key]);
}

export interface IdenticalOrSimilar {
  identicalCharacters: SimilarCharData[];
  similarCharacters: SimilarCharacters | null;
}

export function getIdenticalOrSimilar(baseCharComponents: SignComponents): IdenticalOrSimilar {
  const identicalCharacters: SimilarCharData[] = [];
  const similarCharacters: SimilarCharacters = {
    horizontalPlus: [],
    horizontalMinus: [],
    verticalPlus: [],
    verticalMinus: [],
    glossenkeilPlus: [],
    glossenkeilMinus: [],
    diagonalAscPlus: [],
    diagonalAscMinus: [],
    diagonalDescPlus: [],
    diagonalDescMinus: [],
  };

  // Create hypothetical variants for the selected sign variant.
  const hypotheticalVariants: { [key in keyof Partial<SimilarCharacters>]: SignComponents } = {};
  getTypedKeys(similarCharacters).forEach(key => {
    switch (key) {
      case 'horizontalPlus':
        hypotheticalVariants[key] = { ...baseCharComponents, horizontal: baseCharComponents.horizontal + 1 };
        break;
      case 'horizontalMinus':
        hypotheticalVariants[key] = { ...baseCharComponents, horizontal: baseCharComponents.horizontal - 1 };
        break;
      case 'verticalPlus':
        hypotheticalVariants[key] = { ...baseCharComponents, vertical: baseCharComponents.vertical + 1 };
        break;
      case 'verticalMinus':
        hypotheticalVariants[key] = { ...baseCharComponents, vertical: baseCharComponents.vertical - 1 };
        break;
      case 'glossenkeilPlus':
        hypotheticalVariants[key] = { ...baseCharComponents, glossenkeil: baseCharComponents.glossenkeil + 1 };
        break;
      case 'glossenkeilMinus':
        hypotheticalVariants[key] = { ...baseCharComponents, glossenkeil: baseCharComponents.glossenkeil - 1 };
        break;
      case 'diagonalAscPlus':
        hypotheticalVariants[key] = { ...baseCharComponents, diagonalAsc: baseCharComponents.diagonalAsc + 1 };
        break;
      case 'diagonalAscMinus':
        hypotheticalVariants[key] = { ...baseCharComponents, diagonalAsc: baseCharComponents.diagonalAsc - 1 };
        break;
      case 'diagonalDescPlus':
        hypotheticalVariants[key] = { ...baseCharComponents, diagonalDesc: baseCharComponents.diagonalDesc + 1 };
        break;
      case 'diagonalDescMinus':
        hypotheticalVariants[key] = { ...baseCharComponents, diagonalDesc: baseCharComponents.diagonalDesc - 1 };
        break;
    }
  });

  // Find matches for the hypothetical variants and push them to the similarCharacters object.
  complexCharacters.forEach(character => {
    character.cuneiform.variants.forEach(variant => {

      // Test for identical characters.
      if (componentsMatch(variant.components, baseCharComponents)) {
        identicalCharacters.push({
          category: variant.category,
          fullCharacter: character
        });
      }

      // Test for similar characters.
      const similarKey = getTypedKeys(hypotheticalVariants).find(key => componentsMatch(hypotheticalVariants[key] ?? null, variant.components));
      if (!similarKey) {
        return;
      }
      similarCharacters[similarKey].push({
        category: variant.category,
        fullCharacter: character
      });
    })
  })

  return {
    identicalCharacters: identicalCharacters,
    similarCharacters: similarCharacters
  };
}

export function getSignVariantCategory(character: FullCharacter | null, signCategory: SignVariantCategory): SignVariant | null {
  if (!character) {
    return null;
  }
  return character.cuneiform.variants.find(variant => variant.category === signCategory) ?? null;
}

export function getFontClass(variant: SignVariant | null): string {
  if (!variant) {
    return '';
  }
  switch (variant.fontset) {
    case FontSet.ULLIKUMMI_A:
      return 'cuneiform-a';
    case FontSet.ULLIKUMMI_B:
      return 'cuneiform-b';
    case FontSet.ULLIKUMMI_C:
      return 'cuneiform-c';    
    default:
      return '';
  }
}

export function getFontClassForVariant(charData: SimilarCharData): string {
  const variant = charData.fullCharacter.cuneiform.variants.find(variant => variant.category === variant.category) ?? null;
  if (!variant) {
    return '';
  }
  return getFontClass(variant);

}

export function shuffleArray<T>(array: T[]): T[] {
  return array.sort(() => Math.random() - 0.5);
}

function getRandomItemsFromArray<T>(array: T[], numberOfItems: number): T[] {
  return shuffleArray(array).slice(0, numberOfItems);
}

export function createExercises(characters: FullCharacter[], gameSettings: GameSettings): Exercise[] {
  const exercises: Exercise[] = [];

  if (gameSettings.syllabograms === true) {
    characters.forEach(character => {
      const cuneiformAlternatives: string[] =
        complexCharacters
          .filter(char => char.id !== character.id && char.syllabograph.length > 0)
          .map(char => char.cuneiform.unicode);
      
      const latinAlternatives: string[] =
        complexCharacters
          .filter(char => char.id !== character.id && char.syllabograph.length > 0)
          .map(char => char.syllabograph.join(', '));
  
      const randomCuneiform = getRandomItemsFromArray(cuneiformAlternatives, gameSettings.numberOfAlternatives);
      const randomLatin = getRandomItemsFromArray(latinAlternatives, gameSettings.numberOfAlternatives);
  
      // Add correct answer to list of alternatives
      randomLatin.push(character.syllabograph.join(', '))
      randomCuneiform.push(character.cuneiform.unicode)

      exercises.push({
        id: exercises.length,
        character,
        questionType: 'hitt-2-eng-syll',
        correct: false,
        answers: randomLatin
      });
      exercises.push({
        id: exercises.length,
        character,
        questionType: 'eng-2-hitt-syll',
        correct: false,
        answers: randomCuneiform
      });
    });
  }

  if (gameSettings.logograms === true) {
    characters.forEach(character => {
      const latinAlternatives: string[] =
        complexCharacters
          .filter(char => char.id !== character.id && char.logograph.length > 0)
          .map(char => char.logograph.map(l => l.logTransliteration).join(', ') ?? null);
  
      const cuneiformAlternatives: string[] = 
        complexCharacters
        .filter(char => char.id !== character.id && char.logograph.length > 0)
        .map(char => char.cuneiform.unicode);
      
      const randomLatin = getRandomItemsFromArray(latinAlternatives, gameSettings.numberOfAlternatives);
      const randomCuneiform = getRandomItemsFromArray(cuneiformAlternatives, gameSettings.numberOfAlternatives);
    
      // Add correct answer to list of alternatives
      randomLatin.push(character.logograph.map(l => l.logTransliteration).join(', '))
      randomCuneiform.push(character.cuneiform.unicode)

      exercises.push({
        id: exercises.length,
        character,
        questionType: 'hitt-2-eng-log',
        correct: false,
        answers: randomLatin,
      });

      exercises.push({
        id: exercises.length,
        character,
        questionType: 'eng-2-hitt-log',
        correct: false,
        answers: randomCuneiform
      })
    });
  }

  return exercises;
}