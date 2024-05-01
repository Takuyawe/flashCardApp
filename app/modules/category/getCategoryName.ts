import { CategoriesMap } from '~/types/word';

type GetCategoryName = (
  categories: CategoriesMap,
  categoryId: string
) => string;

export const getCategoryName: GetCategoryName = (categories, categoryId) => {
  const category = categories.get(categoryId);
  if (category) {
    return category.name;
  }
  return '';
};
