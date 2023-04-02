import { FontSet } from "$houdini";
import type { SignComponents } from "./types";
export function renderUnicode(unicodeString: string): string {
  return String.fromCodePoint(parseInt(unicodeString, 16));
}

export const getTypedKeys = Object.keys as <T extends object>(obj: T) => Array<keyof T>;

export function componentsMatch(base: SignComponents | null, other: SignComponents): boolean {
  if (base === null) {
    return false;
  }
  return getTypedKeys(base).every(key => base[key] === other[key]);
}



export const fontsetMapping: { [key in keyof typeof FontSet]: string } = {
  [FontSet.ULLIKUMMI_A]: 'cuneiform-a',
  [FontSet.ULLIKUMMI_B]: 'cuneiform-b',
  [FontSet.ULLIKUMMI_C]: 'cuneiform-c',
}

// export function getFontClass(variant: SignVariant | null): string {
//   if (!variant) {
//     return '';
//   }
//   switch (variant.fontset) {
//     case FontSet.ULLIKUMMI_A:
//       return 'cuneiform-a';
//     case FontSet.ULLIKUMMI_B:
//       return 'cuneiform-b';
//     case FontSet.ULLIKUMMI_C:
//       return 'cuneiform-c';    
//     default:
//       return '';
//   }
// }

// export function getFontClassForVariant(charData: SimilarCharData): string {
//   const variant = charData.fullCharacter.cuneiform.variants.find(variant => variant.category === variant.category) ?? null;
//   if (!variant) {
//     return '';
//   }
//   return getFontClass(variant);

// }

export function shuffleArray<T>(array: T[]): T[] {
  return array.sort(() => Math.random() - 0.5);
}

function getRandomItemsFromArray<T>(array: T[], numberOfItems: number): T[] {
  return shuffleArray(array).slice(0, numberOfItems);
}

// export function createExercises(characters: FullCharacter[], gameSettings: GameSettings): Exercise[] {
//   const exercises: Exercise[] = [];

//   if (gameSettings.syllabograms === true) {
//     characters.forEach(character => {
//       const cuneiformAlternatives: string[] =
//         complexCharacters
//           .filter(char => char.id !== character.id && char.syllabograph.length > 0)
//           .map(char => char.cuneiform.unicode);
      
//       const latinAlternatives: string[] =
//         complexCharacters
//           .filter(char => char.id !== character.id && char.syllabograph.length > 0)
//           .map(char => char.syllabograph.join(', '));
  
//       const randomCuneiform = getRandomItemsFromArray(cuneiformAlternatives, gameSettings.numberOfAlternatives);
//       const randomLatin = getRandomItemsFromArray(latinAlternatives, gameSettings.numberOfAlternatives);
  
//       // Add correct answer to list of alternatives
//       randomLatin.push(character.syllabograph.join(', '))
//       randomCuneiform.push(character.cuneiform.unicode)

//       exercises.push({
//         id: exercises.length,
//         character,
//         questionType: 'hitt-2-eng-syll',
//         correct: false,
//         answers: randomLatin
//       });
//       exercises.push({
//         id: exercises.length,
//         character,
//         questionType: 'eng-2-hitt-syll',
//         correct: false,
//         answers: randomCuneiform
//       });
//     });
//   }

//   if (gameSettings.logograms === true) {
//     characters.forEach(character => {
//       const latinAlternatives: string[] =
//         complexCharacters
//           .filter(char => char.id !== character.id && char.logograph.length > 0)
//           .map(char => char.logograph.map(l => l.logTransliteration).join(', ') ?? null);
  
//       const cuneiformAlternatives: string[] = 
//         complexCharacters
//         .filter(char => char.id !== character.id && char.logograph.length > 0)
//         .map(char => char.cuneiform.unicode);
      
//       const randomLatin = getRandomItemsFromArray(latinAlternatives, gameSettings.numberOfAlternatives);
//       const randomCuneiform = getRandomItemsFromArray(cuneiformAlternatives, gameSettings.numberOfAlternatives);
    
//       // Add correct answer to list of alternatives
//       randomLatin.push(character.logograph.map(l => l.logTransliteration).join(', '))
//       randomCuneiform.push(character.cuneiform.unicode)

//       exercises.push({
//         id: exercises.length,
//         character,
//         questionType: 'hitt-2-eng-log',
//         correct: false,
//         answers: randomLatin,
//       });

//       exercises.push({
//         id: exercises.length,
//         character,
//         questionType: 'eng-2-hitt-log',
//         correct: false,
//         answers: randomCuneiform
//       })
//     });
//   }

//   return exercises;
// }