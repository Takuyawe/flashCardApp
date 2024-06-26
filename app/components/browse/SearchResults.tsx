import { Link } from "@remix-run/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { categoriesAtom, chosenCategoryIdAtom, userAtom } from "~/atoms/atom";
import { getCategoryName } from "~/modules/category/getCategoryName";
import { getWordCategoryPath } from "~/modules/path/getWordCategoryPath";
import { CategoriesMap, WordsMap } from "~/types/word";

type Props = {
  setText: React.Dispatch<React.SetStateAction<string>>;
  searchMatchedWords: WordsMap;
  searchMatchedCategories: CategoriesMap;
  setIsResultBoxOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SearchResults = ({
  setText,
  searchMatchedWords,
  searchMatchedCategories,
  setIsResultBoxOpen,
}: Props) => {
  const [user] = useRecoilState(userAtom);
  const [categories] = useRecoilState(categoriesAtom);
  const [, setChosenCategoryId] = useRecoilState(chosenCategoryIdAtom);
  const [isMatchedCategoriesOpen, setIsMatchedCategoriesOpen] =
    useState<boolean>(false);

  return (
    <motion.div
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="absolute z-10 top-10 min-h-10 h-auto max-h-1/3 w-72 bg-white border border-base-dark rounded-md overflow-auto"
    >
      <div className="flex flex-col mx-2 my-2">
        {searchMatchedWords.size === 0 ? (
          <span className="text-sm">No matched words or categories found</span>
        ) : (
          <div className="flex flex-col gap-y-1">
            <button
              onClick={() =>
                setIsMatchedCategoriesOpen(!isMatchedCategoriesOpen)
              }
              className="flex gap-x-1 items-center"
            >
              {isMatchedCategoriesOpen ? (
                <i className="ri-arrow-down-s-line" />
              ) : (
                <i className="ri-arrow-right-s-line" />
              )}
              <span className="text-xs">Show matched categories</span>
            </button>
            {isMatchedCategoriesOpen &&
              Array.from(searchMatchedCategories.values()).map((category) => (
                <Link
                  // modify
                  to=""
                  onClick={() => {
                    setIsResultBoxOpen(false);
                    setChosenCategoryId(category.id);
                    setText(category.name);
                  }}
                  key={category.id}
                  className="flex gap-x-2"
                >
                  <i className="ri-folder-fill text-bright-blue text-md" />
                  <span className="flex-1 text-sm text-start border-b">
                    {category.name}
                  </span>
                </Link>
              ))}

            {Array.from(searchMatchedWords.values()).map((word) => (
              <Link
                to={getWordCategoryPath(
                  user?.id as string,
                  getCategoryName(categories, word.categoryId),
                  word.categoryId,
                  word.id
                )}
                onClick={() => {
                  setIsResultBoxOpen(false);
                  setChosenCategoryId(word.categoryId);
                  setText(word.name);
                }}
                key={word.id}
                className="flex gap-x-2"
              >
                <i className="ri-file-list-line" />
                <span className="flex-1 text-sm text-start pb-1 border-b">
                  {word.name} / {word.definition}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};
