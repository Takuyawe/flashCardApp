import { prisma } from '~/lib/prisma';
import { Categories, CategoriesMap, CategoryWithChildren } from '~/types/word';

type FetchCategories = (userId: string) => Promise<CategoriesMap>;

export const fetchCategories: FetchCategories = async (userId: string) => {
  const categories: Categories = await prisma.category.findMany({
    where: {
      userId: userId,
    },
  });

  const categoriesMap = new Map<string, CategoryWithChildren>(
    categories.map((category) => [category.id, category])
  );

  return categoriesMap;
};
