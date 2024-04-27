import { CategoriesMap } from '~/types/word';
import { AddCategoryButton } from '../category/AddCategoryButton';
import { CategorySelect } from '../category/CategorySelect';

type Props = {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  categories: CategoriesMap;
  setChosenCategoryId: React.Dispatch<React.SetStateAction<string>>;
};

export const CategorySelectContainer = ({
  category,
  setCategory,
  categories,
  setChosenCategoryId,
}: Props) => {
  return (
    <div className="flex flex-col gap-y-1">
      <label className="text-sm" htmlFor="category">
        Category
      </label>
      <div className="flex w-80 justify-stretch gap-x-2">
        <CategorySelect
          chosenCategory={category}
          setChosenCategory={setCategory}
          categories={categories}
          setChosenCategoryId={setChosenCategoryId}
        />
        <AddCategoryButton categories={categories} />
      </div>
    </div>
  );
};
