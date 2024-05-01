import { Word } from '@prisma/client';
import { motion } from 'framer-motion';

type Props = {
  searchMatchedWords: Word[];
};

export const SearchResults = ({ searchMatchedWords }: Props) => {
  return (
    <motion.div
      initial={{ y: -10 }}
      animate={{ y: 0 }}
      className="absolute top-10 min-h-20 h-auto w-72 bg-white border border-base-dark rounded-md">
      <div className="flex flex-col gap-y-2 mx-2 my-2">
        {searchMatchedWords.map((word) => (
          <button key={word.id} className="flex gap-x-2">
            <i className="ri-file-list-line" />
            <span className="flex-1 text-sm text-start pb-1 border-b">
              {word.name}
            </span>
          </button>
        ))}
      </div>
    </motion.div>
  );
};
