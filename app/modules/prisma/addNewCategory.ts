import { prisma } from "~/lib/prisma";

type AddNewCategory = (
  userId: string,
  parentCategoryId: string | null,
  name: string,
  now: Date
) => void;

export const addNewCategory: AddNewCategory = async (
  userId,
  parentCategoryId,
  name,
  now
) => {
  const response = await prisma.category.create({
    data: {
      userId: userId,
      parentCategoryId: parentCategoryId,
      name: name,
      createdAt: now,
      updatedAt: now,
    },
  });
  return response;
};
