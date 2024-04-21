import { AddCategoryButton } from "../category/AddCategoryButton";
import { CategorySelect } from "../category/CategorySelect";
import { Categories } from "~/types";

type Props = {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  categories: Categories;
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
