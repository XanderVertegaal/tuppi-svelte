import { Character, complexCharacters } from "$lib/charMap";
import type { GameSettings } from "$lib/types";
import { createExercises } from "$lib/utils";
import type { RequestHandler } from "@sveltejs/kit";

export interface CreateExercise {
  selectedIds: number[];
  gameSettings: GameSettings
}

export const POST: RequestHandler = async (event) => {
  const requestBody = await event.request.json() as CreateExercise;

  const selectedCharacters: Character[] = [];
  requestBody.selectedIds.forEach(id => {
    const foundChar = complexCharacters.find(char => char.id === id);
    if (foundChar) {
      selectedCharacters.push(foundChar);
    }
  })

  const exercises = createExercises(selectedCharacters, requestBody.gameSettings);

  const options: ResponseInit = {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    }
  };

  return new Response(JSON.stringify(exercises), options);
}