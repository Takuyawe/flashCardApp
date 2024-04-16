import { useState } from 'react';

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

export const CategoryItem = ({
  category,
  chosenCategory,
  setCategory,
}: ItemProps) => {
  const [isChildrenOpen, setIsChildrenOpen] = useState(true);

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-x-1">
        <button
          onClick={() => setCategory(category.name)}
          className="flex items-center justify-center h-4 min-w-4 rounded-full bg-white outline outline-base-dark">
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
