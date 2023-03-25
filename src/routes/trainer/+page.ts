import type { Character } from "$lib/charMap";
import type { PageLoad } from "./$types";

export interface TrainerPageProps {
  characters: Character[];
}

// export const load: PageLoad = async ({ fetch }) => {

//   const data = await fetch('http://127.0.0.1:5173/api/characters');
//   const chars = await data.json();
  
//   return { characters: chars } as TrainerPageProps;
// };