import { useState } from 'react';
import { CategoryWithChildren } from '~/types';

type Props = {
  category: CategoryWithChildren;
  chosenCategory: string;
  setChosenCategory: React.Dispatch<React.SetStateAction<string>>;
  setChosenCategoryId: React.Dispatch<React.SetStateAction<string>>;
};

export const CategoryItem = ({
  category,
  chosenCategory,
  setChosenCategory,
  setChosenCategoryId,
}: Props) => {
  const [isChildrenOpen, setIsChildrenOpen] = useState(false);

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
        <button
          onClick={() => {
            setChosenCategory(category.name);
            setChosenCategoryId(category.id);
          }}
          className={`text-start w-full pl-1 mr-3 rounded-sm ${
            chosenCategory === category.name && 'bg-light-blue'
          }`}>
          {category.name}
        </button>
      </div>
      {isChildrenOpen &&
        category.childCategories &&
        category.childCategories.length > 0 && (
          <div className="ml-4">
            {category.childCategories.map((childCategory) => (
              <CategoryItem
                key={childCategory.id}
                category={childCategory}
                chosenCategory={chosenCategory}
                setChosenCategory={setChosenCategory}
                setChosenCategoryId={setChosenCategoryId}
              />
            ))}
          </div>
        )}
    </div>
  );
};
