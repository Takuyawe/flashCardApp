import { prisma } from '~/lib/prisma';
import { Categories, CategoriesMap, CategoryWithChildren } from '~/types/word';
import { fetchChildrenCategories } from './fetchChildrenCategories';
import { Category } from '@prisma/client';

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

// type FetchCategories = (userId: string) => Promise<Categories>;

// export const fetchCategories: FetchCategories = async (userId: string) => {
//   const categories: Categories = await prisma.category.findMany({
//     where: {
//       userId: userId,
//       parentCategoryId: null,
//     },
//   });

//   for (const category of categories) {
//     category.childCategories = await fetchChildrenCategories(category.id);
//   }

//   return categories;
// };
