import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { newWordFieldsAtom } from '~/atoms/atom';
import { CategoryWithChildren } from '~/types/word';

type Props = {
  category: CategoryWithChildren;
  setIsCategoriesOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CategoryItem = ({ category, setIsCategoriesOpen }: Props) => {
  const [newWordFields, setNewWordFields] = useRecoilState(newWordFieldsAtom);
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
            <i className="ri-arrow-right-s-line text-2xl" />
          ) : (
            <i className="ri-arrow-down-s-line text-2xl" />
          )}
        </button>
        <button
          onClick={() => {
            setIsCategoriesOpen(false);
            setNewWordFields((prevState) => ({
              ...prevState,
              category: category.name,
              chosenCategoryId: category.id,
            }));
          }}
          className={`flex gap-x-1 items-center text-start w-full border-b pl-1 mr-3 rounded-sm ${
            newWordFields.category === category.name && 'bg-light-blue'
          }`}>
          <i className="ri-folder-fill text-bright-blue text-lg" />
          <span className="text-sm">{category.name}</span>
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
                setIsCategoriesOpen={setIsCategoriesOpen}
              />
            ))}
          </div>
        )}
    </div>
  );
};
