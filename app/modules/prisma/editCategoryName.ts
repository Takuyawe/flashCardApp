import { PRISMA_UNEXPECTED_ERROR } from "~/constants/Authentication";
import { prisma } from "~/lib/prisma";
import { PrismaResponse } from "~/types/prisma";

type EditCategoryName = (
  categoryId: string,
  newCategoryName: string
) => Promise<PrismaResponse>;

export const editCategoryName: EditCategoryName = async (
  categoryId,
  newCategoryName
) => {
  try {
    const data = await prisma.category.update({
      where: {
        id: categoryId,
      },
      data: {
        name: newCategoryName,
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
