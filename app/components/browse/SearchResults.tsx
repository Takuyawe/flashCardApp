import { Word } from '@prisma/client';
import { Link } from '@remix-run/react';
import { motion } from 'framer-motion';
import { useRecoilState } from 'recoil';
import { categoriesAtom, chosenCategoryIdAtom, userAtom } from '~/atoms/atom';
import { getCategoryName } from '~/modules/category/getCategoryName';
import { getWordCategoryPath } from '~/modules/path/getWordCategoryPath';

type Props = {
  setText: React.Dispatch<React.SetStateAction<string>>;
  searchMatchedWords: Word[];
  setIsResultBoxOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SearchResults = ({
  setText,
  searchMatchedWords,
  setIsResultBoxOpen,
}: Props) => {
  const [user] = useRecoilState(userAtom);
  const [categories] = useRecoilState(categoriesAtom);
  const [, setChosenCategoryId] = useRecoilState(chosenCategoryIdAtom);
  return (
    <motion.div
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="absolute top-10 min-h-10 h-auto max-h-1/3 w-72 bg-white border border-base-dark rounded-md overflow-auto">
      <div className="flex flex-col gap-y-2 mx-2 my-2">
        {searchMatchedWords.length === 0 ? (
          <span className="text-sm">No matched words found</span>
        ) : (
          searchMatchedWords.map((word) => (
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
              className="flex gap-x-2">
              <i className="ri-file-list-line" />
              <span className="flex-1 text-sm text-start pb-1 border-b">
                {word.name}
              </span>
            </Link>
          ))
        )}
      </div>
    </motion.div>
  );
};
