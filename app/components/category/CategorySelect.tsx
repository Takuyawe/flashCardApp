import { useState } from 'react';
import { CategoryItem } from './CategoryItem';

const CATEGORIES: Record<
  string,
  {
    name: string;
    children?: Record<
      string,
      { name: string; children?: Record<string, { name: string }> }
    >;
  }
> = {
  1: {
    name: 'Sports',
    children: {
      2: {
        name: 'Baseball',
      },
      3: {
        name: 'Basketball',
        children: {
          7: {
            name: 'Soccer',
          },
        },
      },
    },
  },
  4: {
    name: 'Food',
    children: {
      5: {
        name: 'Fruits',
      },
      6: {
        name: 'Vegetables',
        children: {
          8: {
            name: 'Cabbage',
          },
        },
      },
    },
  },
  9: {
    name: 'Animals',
    children: {
      10: {
        name: 'Mammals',
      },
      11: {
        name: 'Reptiles',
        children: {
          12: {
            name: 'Snakes',
          },
        },
      },
    },
  },
  13: {
    name: 'Fruits',
  },
  14: {
    name: 'Vegetables',
  },
  15: {
    name: 'Cabbages',
  },
  16: {
    name: 'Snakes',
  },
};

type Props = {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
};

export const CategorySelect = ({ category, setCategory }: Props) => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  return (
    <>
      <div className="flex-1 h-10 border-2 border-base-dark rounded-md pl-2 text-lg">
        <div className="flex h-full justify-between items-center">
          {category !== '' ? (
            <span>{category}</span>
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
            {Object.keys(CATEGORIES).map((key) => (
              <CategoryItem
                key={key}
                category={CATEGORIES[key]}
                chosenCategory={category}
                setCategory={setCategory}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
