import { Categories } from '~/types/word';
import { CategoryItem } from './CategoryItem';

type Props = {
  categories: Categories;
};

export const CategoriesList = ({ categories }: Props) => {
  return (
    <div className="flex flex-col w-72">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};
