import { CategoriesMap } from '~/types/word';
import { CategoryItem } from './CategoryItem';
import { useMemo } from 'react';
import { generateCategoriesList } from '~/modules/category/generateCategoriesList';

type Props = {
  categories: CategoriesMap;
  parentCategoryId: string | null;
  categoryId: string | null;
};

export const CategoriesList = ({
  categories,
  parentCategoryId,
  categoryId,
}: Props) => {
  const categoriesList = useMemo(() => {
    if (categoryId) {
      return generateCategoriesList(categories, parentCategoryId).filter(
        (category) => category.id === categoryId
      );
    } else {
      return generateCategoriesList(categories, parentCategoryId);
    }
  }, [categories, parentCategoryId, categoryId]);

  return (
    <div className="flex flex-col gap-y-1 w-72">
      {categoriesList.map((category) => (
        <CategoryItem
          key={category.id}
          category={category}
          categoryId={categoryId}
        />
      ))}
    </div>
  );
};
