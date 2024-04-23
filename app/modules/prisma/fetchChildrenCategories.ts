import { prisma } from '~/lib/prisma';
import { Categories } from '~/types/word';

export const fetchChildrenCategories = async (parentCategoryId: string) => {
  const childrenCategories: Categories = await prisma.category.findMany({
    where: {
      parentCategoryId: parentCategoryId,
    },
  });
  if (childrenCategories.length === 0) return [];
  for (const childCategory of childrenCategories) {
    childCategory.childCategories = await fetchChildrenCategories(
      childCategory.id
    );
  }

  return childrenCategories;
};
