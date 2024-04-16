import { Categories, CategoryWithChildren } from '~/types';

export const createCategoryMap = (categories: Categories) => {
  const categoryMap = new Map<string, CategoryWithChildren>();
  categories.forEach((category) => {
    if (category.parentCategoryId) {
      const parentCategory = categoryMap.get(category.parentCategoryId);
      if (parentCategory) {
        parentCategory.childCategories.push(category);
      }
    } else {
      categoryMap.set(category.id, category);
    }
  });

  //   categoryMap.forEach((category) => {
  //     if (category.parentCategoryId)
  //       categoryMap.delete(category.parentCategoryId);
  //   });

  //   console.log(categoryMap);

  //   console.log(categoryMap.get('clv1zv2o20005wio4uediw5hx')?.childCategories);
};
