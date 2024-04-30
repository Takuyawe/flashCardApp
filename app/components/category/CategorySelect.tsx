import { useMemo, useState } from 'react';
import { CategoryItem } from './CategoryItem';
import { generateCategoriesList } from '~/modules/category/generateCategoriesList';
import { useRecoilState } from 'recoil';
import { categoriesAtom, newWordFieldsAtom } from '~/atoms/atom';

type Props = {
  isCategoryAddingScreen?: boolean;
};

export const CategorySelect = ({ isCategoryAddingScreen }: Props) => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [categories] = useRecoilState(categoriesAtom);
  const [newWordFields, setNewWordFields] = useRecoilState(newWordFieldsAtom);

  const categoriesList = useMemo(() => {
    return generateCategoriesList(categories, null);
  }, [categories]);

  return (
    <>
      <div className="flex-1 h-10 border-2 border-base-dark rounded-md pl-2 text-lg">
        <div className="flex h-full justify-between items-center">
          {newWordFields.category !== '' ? (
            <span>{newWordFields.category}</span>
          ) : (
            <span className="opacity-40">Choose a category</span>
          )}

          <button
            onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
            className="h-10 w-10">
            {isCategoriesOpen ? (
              <i className="ri-arrow-down-s-line text-3xl" />
            ) : (
              <i className="ri-arrow-up-s-line text-3xl" />
            )}
          </button>
        </div>
      </div>
      {isCategoriesOpen && (
        <div
          className={`absolute ${
            isCategoryAddingScreen
              ? 'top-44 left-7 min-h-48 max-h-96 w-5/6'
              : 'top-36 left-12 min-h-60 max-h-96 w-2/3'
          } overflow-auto h-auto py-4 pl-3 rounded-md bg-white border border-base-dark`}>
          <div className="flex flex-col">
            <button
              onChange={() =>
                setNewWordFields({
                  ...newWordFields,
                  category: 'root',
                  chosenCategoryId: '',
                })
              }
              className="bg-base-dark text-white text-sm rounded-sm mb-2 mx-auto px-3">
              Add a folder in the root directory
            </button>
            {categoriesList.map((category) => (
              <CategoryItem key={category.id} category={category} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
