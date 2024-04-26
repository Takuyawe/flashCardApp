import { CategoriesMap, CategoryWithChildren } from '~/types/word';

export const getCategoriesPath = (
  categories: CategoriesMap,
  categoryId: string | null
) => {
  const categoriesPath: CategoryWithChildren[] = [];

  if (categoryId === null) return categoriesPath;

  categories.forEach((category) => {
    if (category.id === categoryId) {
      categoriesPath.push(category);
      getCategoriesPath(categories, category.parentCategoryId);
    }
  });
  console.log(categoriesPath);
  return categoriesPath;
};
