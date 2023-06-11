import { Prisma, type SignVariantCategory } from "@prisma/client";
import { getTypedKeys } from "./utils";
import type { SignComponents } from "./types";
import prisma from "./prisma";

// Top-level function
export async function getIdenticalAndSimilar(components: SignComponents): Promise<IdenticalAndSimilar> {
  const { horizontal, vertical, glossenkeil, diagonalAsc, diagonalDesc } = components;

  const identicalVariants = await prisma.characterVariant.findMany({
    where: { horizontal, vertical, glossenkeil, diagonalAsc, diagonalDesc },
    include: {
      character: {
        include: {
          variants: true
        }
      }
    }
  }) satisfies VariantsWithCharacter[];

  const similarVariants = await getSimilarVariants(components);

  return { identicalVariants, similarVariants };
}

interface IdenticalAndSimilar {
  identicalVariants: VariantsWithCharacter[];
  similarVariants: SimilarVariants;
}

const VariantsWithCharacter = Prisma.validator<Prisma.CharacterVariantArgs>()({
  include: {
    character: {
      include: {
        variants: true
      }
    }
  }
});

type VariantsWithCharacter = Prisma.CharacterVariantGetPayload<typeof VariantsWithCharacter>;


const CharacterWithVariants = Prisma.validator<Prisma.CharacterArgs>()({
  include: {
    variants: true
  }
});

type CharacterWithVariants = Prisma.CharacterGetPayload<typeof CharacterWithVariants>;


export interface ComparableVariant {
  category: SignVariantCategory;
  character: CharacterWithVariants;
}

export interface SimilarVariants {
  horizontalPlus: ComparableVariant[];
  horizontalMinus: ComparableVariant[];
  verticalPlus: ComparableVariant[];
  verticalMinus: ComparableVariant[];
  glossenkeilPlus: ComparableVariant[];
  glossenkeilMinus: ComparableVariant[];
  diagonalAscPlus: ComparableVariant[];
  diagonalAscMinus: ComparableVariant[];
  diagonalDescPlus: ComparableVariant[];
  diagonalDescMinus: ComparableVariant[];
}

export async function getSimilarVariants(signComponents: SignComponents, difference = 1): Promise<SimilarVariants> {
  let similarVariants: SimilarVariants = {
    horizontalPlus: [],
    horizontalMinus: [],
    verticalPlus: [],
    verticalMinus: [],
    glossenkeilPlus: [],
    glossenkeilMinus: [],
    diagonalAscPlus: [],
    diagonalAscMinus: [],
    diagonalDescPlus: [],
    diagonalDescMinus: [],
  };

  // Create hypothetical variants for the selected sign variant.
  const hypotheticalVariants: { [key in keyof SimilarVariants]: SignComponents } = {
    horizontalPlus: { ...signComponents, horizontal: signComponents.horizontal + difference },
    horizontalMinus: { ...signComponents, horizontal: signComponents.horizontal - difference },
    verticalPlus: { ...signComponents, vertical: signComponents.vertical + difference },
    verticalMinus: { ...signComponents, vertical: signComponents.vertical - difference },
    glossenkeilPlus: { ...signComponents, glossenkeil: signComponents.glossenkeil + difference },
    glossenkeilMinus: { ...signComponents, glossenkeil: signComponents.glossenkeil - difference },
    diagonalAscPlus: { ...signComponents, diagonalAsc: signComponents.diagonalAsc + difference },
    diagonalAscMinus: { ...signComponents, diagonalAsc: signComponents.diagonalAsc - difference },
    diagonalDescPlus: { ...signComponents, diagonalDesc: signComponents.diagonalDesc + difference },
    diagonalDescMinus: { ...signComponents, diagonalDesc: signComponents.diagonalDesc - difference },
  };

  async function findCharacter(characterInput: SignComponents): Promise<ComparableVariant[]> {
    const { horizontal, vertical, glossenkeil, diagonalAsc, diagonalDesc } = characterInput;
    const foundVariants = await prisma.characterVariant.findMany({
      where: {
        horizontal, vertical, glossenkeil, diagonalAsc, diagonalDesc
      },
      include: {
        character: {
          include: {
            variants: true
          }
        }
      }
    });
    return foundVariants.map(foundVar => ({ category: foundVar.category, character: foundVar.character }));
  }
    
  const keyFound = await Promise.all(getTypedKeys(hypotheticalVariants).map(async key => ({
    [key]: await findCharacter(hypotheticalVariants[key])
  })
  ));

  similarVariants = keyFound.reduce((acc, curr) => ({ ...acc, ...curr }), similarVariants);
    
  return similarVariants;
}