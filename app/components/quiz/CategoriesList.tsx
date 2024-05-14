import { motion } from "framer-motion";
import { useMemo } from "react";
import { useRecoilState } from "recoil";
import { categoriesAtom } from "~/atoms/atom";
import { generateCategoriesList } from "~/modules/category/generateCategoriesList";
import { CategoryItem } from "./CategoryItem";

export const CategoriesList = () => {
  const [categories] = useRecoilState(categoriesAtom);

  const categoriesList = useMemo(() => {
    return generateCategoriesList(categories, null);
  }, [categories]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      // exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.3 }}
      className="overflow-auto h-auto w-1/2 pl-3 rounded-md bg-white"
    >
      <div>
        {categoriesList.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </div>
    </motion.div>
  );
};
