import { useState } from 'react';

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

type ItemProps = {
  category: {
    name: string;
    children?: Record<
      number,
      { name: string; children?: Record<string, { name: string }> }
    >;
  };
  chosenCategory: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
};

const CategoryItem = ({ category, chosenCategory, setCategory }: ItemProps) => {
  const [isChildrenOpen, setIsChildrenOpen] = useState(true);

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-x-1">
        <button
          onClick={() => setCategory(category.name)}
          className="flex items-center justify-center h-4 w-4 rounded-full bg-white outline outline-base-dark">
          {chosenCategory === category.name && (
            <i className="ri-circle-fill text-base-dark text-md" />
          )}
        </button>
        {category.children && !isChildrenOpen ? (
          <i className="ri-arrow-right-s-line text-xl" />
        ) : (
          <i className="ri-arrow-down-s-line text-xl" />
        )}
        <button onClick={() => setIsChildrenOpen(!isChildrenOpen)}>
          <i className="ri-folder-fill text-bright-blue text-2xl" />
        </button>
        <span>{category.name}</span>
      </div>
      {isChildrenOpen && category.children && (
        <div className="ml-4">
          {Object.keys(category.children).map((childKey) => (
            <CategoryItem
              key={childKey}
              category={category.children![parseInt(childKey)]}
              chosenCategory={chosenCategory}
              setCategory={setCategory}
            />
          ))}
        </div>
      )}
    </div>
  );
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
