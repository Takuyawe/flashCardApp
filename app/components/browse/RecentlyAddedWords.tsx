import { useState } from 'react';
import { WordsMap } from '~/types/word';

type Props = {
  words: WordsMap;
};
export const RecentlyAddedWords = ({ words }: Props) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex flex-col items-start w-72">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex gap-x-1 items-center">
        {isOpen ? (
          <i className="ri-arrow-down-s-line" />
        ) : (
          <i className="ri-arrow-right-s-line" />
        )}
        <span className="">Recently Added</span>
      </button>
    </div>
  );
};
