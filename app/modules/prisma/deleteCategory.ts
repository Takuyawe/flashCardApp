import { Category } from '@prisma/client';
import { prisma } from '~/lib/prisma';

type DeleteCategory = (categoryId: string) => Promise<Category>;

export const deleteCategory: DeleteCategory = async (categoryId) => {
  return await prisma.category.delete({ where: { id: categoryId } });
};
