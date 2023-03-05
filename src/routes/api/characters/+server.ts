import { complexCharacters } from "$lib/charMap";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async () => {
  const options: ResponseInit = {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  };

  const responseBody = JSON.stringify(complexCharacters);

  return new Response(responseBody, options);
}