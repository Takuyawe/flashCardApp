import { CategoriesMap } from '~/types/word';
import { CategoryItem } from './CategoryItem';
import { useMemo } from 'react';
import { generateCategoriesList } from '~/modules/category/generateCategoriesList';

type Props = {
  categories: CategoriesMap;
  parentCategoryId: string | null;
};

export const CategoriesList = ({ categories, parentCategoryId }: Props) => {
  const categoriesList = useMemo(() => {
    return generateCategoriesList(categories, parentCategoryId);
  }, [categories, parentCategoryId]);

  return (
    <div className="flex flex-col gap-y-1 w-72">
      {categoriesList.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};
