import { Link } from "@remix-run/react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { newWordFieldsAtom } from "~/atoms/atom";
import { CategoryWithChildren } from "~/types/word";

type Props = {
  categories: CategoryWithChildren[];
  setIsCategoriesOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const RecentlyAddedCategories = ({
  categories,
  setIsCategoriesOpen,
}: Props) => {
  const [, setNewWordFields] = useRecoilState(newWordFieldsAtom);
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex flex-col border-b pb-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex gap-x-1 items-center"
      >
        {isOpen ? (
          <i className="ri-arrow-down-s-line" />
        ) : (
          <i className="ri-arrow-right-s-line" />
        )}
        <span className="text-xs">Recently used categories</span>
      </button>
      {isOpen &&
        categories.map((category) => (
          <button
            key={category.id}
            className="flex gap-x-2 items-center ml-3"
            onClick={() => {
              setIsCategoriesOpen(false);
              setNewWordFields((prevState) => ({
                ...prevState,
                category: category.name,
                chosenCategoryId: category.id,
              }));
            }}
          >
            <i className="ri-folder-fill text-bright-blue text-sm" />
            <span className="text-sm">{category.name}</span>
          </button>
        ))}
    </div>
  );
};
