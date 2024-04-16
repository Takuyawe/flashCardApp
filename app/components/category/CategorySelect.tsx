import { useState } from 'react';
import { CategoryItem } from './CategoryItem';
import { Categories } from '~/types';

type Props = {
  chosenCategory: string;
  setChosenCategory: React.Dispatch<React.SetStateAction<string>>;
  categories: Categories;
};

export const CategorySelect = ({
  chosenCategory,
  setChosenCategory,
  categories,
}: Props) => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  return (
    <>
      <div className="flex-1 h-10 border-2 border-base-dark rounded-md pl-2 text-lg">
        <div className="flex h-full justify-between items-center">
          {chosenCategory !== '' ? (
            <span>{chosenCategory}</span>
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
        <div className="absolute top-44 left-7 py-4 pl-3 h-auto min-h-60 max-h-96 overflow-auto w-5/6 rounded-md bg-white border border-base-dark">
          <div className="flex flex-col">
            {/* TODO: create root category option */}
            {categories.map((category) => (
              <CategoryItem
                key={category.id}
                category={category}
                chosenCategory={chosenCategory}
                setChosenCategory={setChosenCategory}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
