import { useMemo, useState } from "react";
import { CategoryItem } from "./CategoryItem";
import { generateCategoriesList } from "~/modules/category/generateCategoriesList";
import { useRecoilState } from "recoil";
import { categoriesAtom, newWordFieldsAtom } from "~/atoms/atom";
import { motion } from "framer-motion";
import { RecentlyAddedCategories } from "./RecentlyAddedCategories";

export const CategorySelectBox = () => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [categories] = useRecoilState(categoriesAtom);
  const [newWordFields] = useRecoilState(newWordFieldsAtom);

  const categoriesList = useMemo(() => {
    return generateCategoriesList(categories, null);
  }, [categories]);

  const recentlyAddedCategories = useMemo(() => {
    return Array.from(categories.values()).slice(0, 3);
  }, [categories]);

  return (
    <div className="flex flex-col gap-y-1">
      <label className="text-xs" htmlFor="category">
        Category <span className="text-bright-red">*</span>
      </label>
      <div className="flex w-80 justify-stretch gap-x-2">
        <div className="flex-1 h-8 border-2 border-base-dark rounded-md pl-2 text-md">
          <div className="flex h-full justify-between items-center">
            {newWordFields.category !== "" ? (
              <span>{newWordFields.category}</span>
            ) : (
              <span className="opacity-40">Choose a category</span>
            )}

            <button
              onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
              className="h-8 w-8"
            >
              {isCategoriesOpen ? (
                <i className="ri-arrow-down-s-line text-2xl" />
              ) : (
                <i className="ri-arrow-up-s-line text-2xl" />
              )}
            </button>
          </div>
        </div>
        {isCategoriesOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
            className="absolute z-10 top-44 left-1/2 transform -translate-x-1/2 min-h-60 max-h-96 w-80 overflow-auto h-auto py-4 pl-3 rounded-md bg-white border border-base-dark"
          >
            <div>
              <RecentlyAddedCategories
                categories={recentlyAddedCategories}
                setIsCategoriesOpen={setIsCategoriesOpen}
              />
              {categoriesList.map((category) => (
                <CategoryItem
                  key={category.id}
                  category={category}
                  setIsCategoriesOpen={setIsCategoriesOpen}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
