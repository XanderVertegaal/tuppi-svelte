import { complexCharacters } from "$lib/charMap";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async (requestOptions) => {
  requestOptions.isDataRequest
  const { params } = requestOptions;
  const character = complexCharacters.find((char) => char.id.toString() === params.characterId);

  if (!character) {
    return new Response(JSON.stringify({ error: "Character not found" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } else {
    return new Response(JSON.stringify({ character }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      }
    });
  }
}