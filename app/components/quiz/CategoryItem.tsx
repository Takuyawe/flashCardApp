import { useFetcher } from '@remix-run/react';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { userAtom } from '~/atoms/atom';
import { ADD_CATEGORY } from '~/constants/ActionPath';
import { CategoryWithChildren } from '~/types/word';

type Props = {
  category: CategoryWithChildren;
};

export const CategoryItem = ({ category }: Props) => {
  const addCategoryFetcher = useFetcher();
  const [user] = useRecoilState(userAtom);
  const [isChildrenOpen, setIsChildrenOpen] = useState(
    category.parentCategoryId === null
  );
  const [isAddingCategory, setIsAddingCategory] = useState<boolean>(false);
  const [newCategoryName, setNewCategoryName] = useState<string>('');

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-x-1 mr-3">
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
        <div className="flex flex-1 border-b">
          <button onClick={() => {}}>
            <i className="ri-folder-fill text-bright-blue text-lg" />
            <span className="text-sm">{category.name}</span>
          </button>

          <div className="flex gap-x-1 ml-auto">
            {category.parentCategoryId === null && (
              <button
                onClick={() => setIsChildrenOpen(false)}
                className="opacity-50">
                <i className="ri-folder-reduce-line text-lg" />
              </button>
            )}
            <button
              onClick={() => {
                setIsChildrenOpen(true);
                setIsAddingCategory(true);
              }}
              className="opacity-50">
              <i className="ri-add-line text-lg" />
            </button>
          </div>
        </div>
      </div>
      {isAddingCategory && (
        <div className="flex gap-x-1 items-center mt-1 ml-12 opacity-50">
          <i className="ri-folder-fill text-bright-blue text-lg" />
          <input
            onBlur={() => {
              setIsAddingCategory(false);
              if (newCategoryName.trim() === '') {
                setNewCategoryName('');
                return;
              }
              const formData = new FormData();
              formData.append('userId', user?.id as string);
              formData.append('newCategoryName', newCategoryName);
              formData.append('parentCategoryId', category.id);
              addCategoryFetcher.submit(formData, {
                method: 'post',
                action: ADD_CATEGORY,
              });
              setNewCategoryName('');
              setIsChildrenOpen(true);
            }}
            autoFocus
            value={newCategoryName}
            name="newCategoryName"
            onChange={(e) => setNewCategoryName(e.target.value)}
            type="text"
            className="border-b h-4 px-2 text-xs"
          />
        </div>
      )}
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
