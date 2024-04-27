import { Category } from "@prisma/client";
import { Link } from "@remix-run/react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { chosenCategoryIdAtom, userAtom } from "~/atoms/atom";
import { getWordCategoryPath } from "~/modules/path/getWordCategoryPath";
import { CategoryWithChildren } from "~/types/word";

type Props = {
  category: CategoryWithChildren;
};

export const CategoryItem = ({ category }: Props) => {
  const [isChildrenOpen, setIsChildrenOpen] = useState(true);
  const [user] = useRecoilState(userAtom);
  const [, setChosenCategoryId] = useRecoilState(chosenCategoryIdAtom);

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-x-1">
        <button
          onClick={() => setIsChildrenOpen(!isChildrenOpen)}
          className="flex items-center justify-center"
        >
          {category.childCategories &&
          category.childCategories.length > 0 &&
          !isChildrenOpen ? (
            <i className="ri-arrow-right-s-line text-xl" />
          ) : (
            <i className="ri-arrow-down-s-line text-xl" />
          )}
          <i className="ri-folder-fill text-bright-blue text-2xl" />
        </button>
        <Link
          to={getWordCategoryPath(
            user?.id as string,
            category.name,
            category.id
          )}
        >
          <button onClick={() => setChosenCategoryId(category.id)}>
            {category.name}
          </button>
        </Link>
      </div>
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
