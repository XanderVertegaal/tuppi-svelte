import { complexCharacters } from "$lib/charMap";
import type { SignVariantCategory } from "$lib/types";
import { getIdenticalOrSimilar } from "$lib/utils";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ params, url }) => {
  const characterId: string = params.characterId;
  const signType = url.searchParams.get('type') as SignVariantCategory;
  const baseChar = complexCharacters.find(char => char.id === parseInt(characterId));

  if (!baseChar) {
    return new Response(`Character with id ${characterId} not found`, { status: 404 });
  }

  const baseCharVariant = baseChar.cuneiform.variants.find(variant => variant.category === signType);
  if (!baseCharVariant) {
    return new Response(`Character with id ${characterId} does not have a variant of type ${signType}`, { status: 404  });
  }

  const identicalOrSimilar = getIdenticalOrSimilar(baseCharVariant.components);

  const options: ResponseInit = {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    }
  };

  return new Response(JSON.stringify(identicalOrSimilar), options);
};