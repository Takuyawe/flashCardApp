import { Categories, CategoriesMap } from "~/types/word";

export const getCategoriesPath = (
  categoriesPath: Categories,
  categories: CategoriesMap,
  categoryId: string
) => {
  categories.forEach((category) => {
    if (category.id === categoryId) {
      if (category.parentCategoryId === null) {
        return categoriesPath;
      }
      categoriesPath.unshift(category);
      getCategoriesPath(
        categoriesPath,
        categories,
        category.parentCategoryId as string
      );
    }
  });
  return categoriesPath;
};
