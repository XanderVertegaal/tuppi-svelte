import { getIdenticalAndSimilar } from "$lib/findSimilarCharacters";
import type { SignComponents } from "$lib/types";
import type { PageServerLoad } from "./$types";

export const load = async function () {
  const initialParams: SignComponents = {
    vertical: 0,
    horizontal: 1,
    glossenkeil: 0,
    diagonalAsc: 0,
    diagonalDesc: 0,
  };

  const { identicalVariants, similarVariants } = await getIdenticalAndSimilar(initialParams);

  return { identicalVariants, similarVariants };
} satisfies PageServerLoad;