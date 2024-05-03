import { Link } from "@remix-run/react";
import { useMemo } from "react";
import { useRecoilState } from "recoil";
import { categoriesAtom, chosenCategoryIdAtom, userAtom } from "~/atoms/atom";
import { getCategoriesPath } from "~/modules/category/getCategoriesPath";
import { getBrowsePath } from "~/modules/path/getBrowsePath";
import { getCategoryPathWithCategoryId } from "~/modules/path/getCategoryPathWithCategoryId";
import { CategoryWithChildren } from "~/types/word";

export const CategoryPath = () => {
  const [user] = useRecoilState(userAtom);
  const [categories] = useRecoilState(categoriesAtom);
  const [chosenCategoryId, setChosenCategoryId] =
    useRecoilState(chosenCategoryIdAtom);

  const categoriesPath = useMemo(() => {
    return getCategoriesPath(
      new Array<CategoryWithChildren>(),
      categories,
      chosenCategoryId
    );
  }, [categories, chosenCategoryId]);

  return (
    <div className="flex w-72">
      <div className="flex gap-x-1">
        <Link
          to={getBrowsePath(user?.id as string)}
          className="flex gap-x-1"
          onClick={() => setChosenCategoryId("")}
        >
          <i className="ri-folder-fill text-gray-500 text-md" />
          <span className="text-base-dark">{user?.name}</span>
        </Link>
        <i className="ri-arrow-right-s-line" />
      </div>
      {categoriesPath.map((category, index) => (
        <div key={category.id} className="flex gap-x-1">
          <Link
            to={getCategoryPathWithCategoryId(
              user?.id as string,
              category.name,
              category.id
            )}
            className="flex gap-x-1"
            onClick={() => setChosenCategoryId(category.id)}
          >
            <i className="ri-folder-fill text-gray-500 text-md" />
            <span className="text-base-dark">{category.name}</span>
          </Link>
          {index !== categoriesPath.length - 1 && (
            <i className="ri-arrow-right-s-line" />
          )}
        </div>
      ))}
    </div>
  );
};
