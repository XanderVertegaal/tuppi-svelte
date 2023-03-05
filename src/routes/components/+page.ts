import { SignVariantCategory, type FullCharacter, type SignComponents } from "$lib/types";
import type { PageLoad } from "./$types";

export type SimilarCharData = {
  fullCharacter: FullCharacter;
  category: SignVariantCategory;
}

export type SimilarCharacters = {
  [Key in keyof SignComponents as `${Key}Plus`]: SimilarCharData[]
} & {
  [Key in keyof SignComponents as `${Key}Minus`]: SimilarCharData[]
};

export interface ComponentsPageProps {
  character: FullCharacter | null;
  signType: SignVariantCategory;
  error: string | null;
  identicalCharacters: SimilarCharData[];       // Characters with exactly the same components.
  similarCharacters: SimilarCharacters | null;  // Characters differing only one component from the referent.
}

export const load: PageLoad = async ({ fetch }) => {
  const charData = await fetch('http://127.0.0.1:5173/api/characterInfo/1');
  
  // For the first page load, we will use the default of sign with id 1.
  const signType = SignVariantCategory.DEFAULT;
  const componentDataURL = new URL('http://127.0.0.1:5173/api/similar-characters/1');
  componentDataURL.searchParams.append('type', 'default');
  const similarResponse = await fetch(componentDataURL);
  
  const { character, error } = await charData.json();
  const { identicalCharacters, similarCharacters } = await similarResponse.json();

  return {
    character,
    signType,
    error,
    identicalCharacters,
    similarCharacters
  } as ComponentsPageProps;
}