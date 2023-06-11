
import { getIdenticalAndSimilar } from "$lib/findSimilarCharacters";
import type { SignComponents } from "$lib/types";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST = (async ({ request }) => {
  const requestBody = await request.json();

  // Bit of type safety.
  const queryInput: SignComponents = {
    vertical: requestBody.vertical ?? 0,
    horizontal: requestBody.horizontal ?? 0,
    glossenkeil: requestBody.glossenkeil ?? 0,
    diagonalAsc: requestBody.diagonalAsc ?? 0,
    diagonalDesc: requestBody.diagonalDesc ?? 0,
  }

  const { identicalVariants, similarVariants } = await getIdenticalAndSimilar(queryInput);

  return json({ identicalVariants, similarVariants });
}) satisfies RequestHandler;
