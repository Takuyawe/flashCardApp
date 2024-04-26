import { CategoriesMap, CategoryWithChildren } from '~/types/word';

export const generateCategoriesList = (
  categories: CategoriesMap,
  parentCategoryId: string | null
) => {
  const categoriesList: CategoryWithChildren[] = [];
  categories.forEach((category) => {
    if (category.parentCategoryId === parentCategoryId) {
      const childCategory: CategoryWithChildren = {
        ...category,
        childCategories: generateCategoriesList(categories, category.id),
      };

      categoriesList.push(childCategory);
    }
  });
  return categoriesList;
};
