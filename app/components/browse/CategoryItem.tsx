import { useState } from 'react';
import { CategoryWithChildren } from '~/types/word';

type Props = {
  category: CategoryWithChildren;
};

export const CategoryItem = ({ category }: Props) => {
  const [isChildrenOpen, setIsChildrenOpen] = useState(true);

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-x-1">
        <button
          onClick={() => setIsChildrenOpen(!isChildrenOpen)}
          className="flex items-center justify-center">
          {category.childCategories &&
          category.childCategories.length > 0 &&
          !isChildrenOpen ? (
            <i className="ri-arrow-right-s-line text-xl" />
          ) : (
            <i className="ri-arrow-down-s-line text-xl" />
          )}
          <i className="ri-folder-fill text-bright-blue text-2xl" />
        </button>
        <button>{category.name}</button>
      </div>
      {isChildrenOpen &&
        category.childCategories &&
        category.childCategories.length > 0 && (
          <div className="ml-4">
            {category.childCategories.map((childCategory) => (
              <CategoryItem key={childCategory.id} category={childCategory} />
            ))}
          </div>
        )}
    </div>
  );
};
