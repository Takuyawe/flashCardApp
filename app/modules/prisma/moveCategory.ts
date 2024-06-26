import { PRISMA_UNEXPECTED_ERROR } from "~/constants/Authentication";
import { prisma } from "~/lib/prisma";
import { PrismaResponse } from "~/types/prisma";

type MoveCategory = (
  currentCategoryId: string,
  targetCategoryId: string
) => Promise<PrismaResponse>;

export const moveCategory: MoveCategory = async (
  currentCategoryId,
  targetCategoryId
) => {
  try {
    const data = await prisma.category.update({
      where: {
        id: currentCategoryId,
      },
      data: {
        parentCategoryId: targetCategoryId,
      },
    });
    return { data };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }

  return { message: PRISMA_UNEXPECTED_ERROR };
};
