import { AddCategoryButton } from '../category/AddCategoryButton';
import { CategorySelect } from '../category/CategorySelect';

type Props = {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
};

export const CategorySelectContainer = ({ category, setCategory }: Props) => {
  return (
    <div className="flex flex-col gap-y-1">
      <label className="text-md" htmlFor="category">
        Category
      </label>
      <div className="flex w-80 justify-stretch gap-x-2">
        <CategorySelect category={category} setCategory={setCategory} />
        <AddCategoryButton />
      </div>
    </div>
  );
};
