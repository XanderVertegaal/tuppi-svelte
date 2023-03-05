import type { SignComponents } from "$lib/types";
import { getIdenticalOrSimilar } from "$lib/utils";
import type { RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async (event) => {
  const data = await event.request.json() as SignComponents;
  console.log(data);

  const identicalOrSimilar = getIdenticalOrSimilar(data);

  const options: ResponseInit = {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    }
  };

  return new Response(JSON.stringify(identicalOrSimilar), options);
}