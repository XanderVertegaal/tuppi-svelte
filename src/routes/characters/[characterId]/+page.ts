import type { FullCharacter } from '$lib/types';
import type { PageLoad } from './$types';

export interface CharDetailsPageProps {
  character: FullCharacter | null;
  error: string | null;
  characterId: string
}

// export const load: PageLoad = async ({ params, fetch }) => {
//   const { characterId } = params;

//   const data = await fetch('http://127.0.0.1:5173/api/characterInfo/' + characterId);
//   const { character, error } = await data.json();

//   return { character, error, characterId } as CharDetailsPageProps;
// }