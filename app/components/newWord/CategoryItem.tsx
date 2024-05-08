import { useFetcher } from '@remix-run/react';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { newWordFieldsAtom, userAtom } from '~/atoms/atom';
import { ADD_CATEGORY, EDIT_CATEGORY_NAME } from '~/constants/ActionPath';
import { CategoryWithChildren } from '~/types/word';

type Props = {
  category: CategoryWithChildren;
  setIsCategoriesOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CategoryItem = ({ category, setIsCategoriesOpen }: Props) => {
  const [newWordFields, setNewWordFields] = useRecoilState(newWordFieldsAtom);
  const [user] = useRecoilState(userAtom);
  const addCategoryFetcher = useFetcher();
  const editCategoryFetcher = useFetcher();
  const [isChildrenOpen, setIsChildrenOpen] = useState(
    category.parentCategoryId === null
  );
  const [isAddingCategory, setIsAddingCategory] = useState<boolean>(false);
  const [newCategoryName, setNewCategoryName] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingText, setEditingText] = useState<string>(category.name);

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
          {isEditing ? (
            <div className="flex gap-x-1 pl-1">
              <i className="ri-folder-fill text-bright-blue text-lg" />
              <input
                autoFocus
                className="text-sm pl-1"
                type="text"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
              />
            </div>
          ) : (
            <button
              onClick={() => {
                setIsCategoriesOpen(false);
                setNewWordFields((prevState) => ({
                  ...prevState,
                  category: category.name,
                  chosenCategoryId: category.id,
                }));
              }}
              className={`flex gap-x-1 items-center text-start pl-1 pr-2 rounded-sm ${
                newWordFields.category === category.name && 'bg-light-blue'
              }`}>
              <i className="ri-folder-fill text-bright-blue text-lg" />
              <span className="text-sm">{category.name}</span>
            </button>
          )}
          <div className="flex gap-x-1 ml-auto">
            {category.parentCategoryId !== null ? (
              isEditing ? (
                <button
                  className="opacity-50"
                  onClick={() => {
                    if (editingText === '' || editingText === category.name) {
                      setIsEditing(false);
                      return;
                    }
                    const formData = new FormData();
                    formData.append('categoryId', category.id as string);
                    formData.append('newCategoryName', editingText);
                    editCategoryFetcher.submit(formData, {
                      method: 'post',
                      action: EDIT_CATEGORY_NAME,
                    });
                    setIsEditing(false);
                  }}>
                  <i className="ri-send-plane-2-fill text-md" />
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="opacity-50">
                  <i className="ri-pencil-fill text-lg" />
                </button>
              )
            ) : (
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
