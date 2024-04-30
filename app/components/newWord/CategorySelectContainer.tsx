import { AddCategoryButton } from '../category/AddCategoryButton';
import { CategorySelect } from '../category/CategorySelect';

export const CategorySelectContainer = () => {
  return (
    <div className="flex flex-col gap-y-1">
      <label className="text-sm" htmlFor="category">
        Category <span className="text-bright-red">*</span>
      </label>
      <div className="flex w-80 justify-stretch gap-x-2">
        <CategorySelect />
        <AddCategoryButton />
      </div>
    </div>
  );
};
