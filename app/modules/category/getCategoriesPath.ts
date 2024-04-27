import { CategoriesMap, CategoryWithChildren } from "~/types/word";

export const getCategoriesPath = (
  categoriesPath: CategoryWithChildren[],
  categories: CategoriesMap,
  categoryId: string | null
) => {
  if (categoryId === null) return categoriesPath;

  categories.forEach((category) => {
    if (category.id === categoryId) {
      categoriesPath.unshift(category);
      getCategoriesPath(categoriesPath, categories, category.parentCategoryId);
    }
  });
  return categoriesPath;
};
