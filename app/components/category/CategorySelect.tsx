import { useState } from 'react';

export const CategorySelect = () => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  // TODO: customize options

  return (
    // <select
    //   name="category"
    //   className="flex-1 border-2 border-base-dark rounded-md pl-2 text-lg">
    //   <option value="1">Category 1</option>
    //   <option value="2">Category 2</option>
    //   <option value="3">Category 3</option>
    //   <option value="4">Category 4</option>
    //   <option value="5">Category 5</option>
    // </select>
    <div className="flex-1 h-10 border-2 border-base-dark rounded-md pl-2 text-lg">
      <div className="flex h-full justify-between items-center">
        <span className="opacity-40">Choose a category</span>
        <button
          onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
          className="h-10 w-10">
          {isCategoriesOpen ? (
            <i className="ri-arrow-down-s-line text-3xl" />
          ) : (
            <i className="ri-arrow-up-s-line text-3xl" />
          )}
          {/* <i className="ri-folder-fill text-bright-blue text-2xl" /> */}
        </button>
      </div>
    </div>
  );
};
