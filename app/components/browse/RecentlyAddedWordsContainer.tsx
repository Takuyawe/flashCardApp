import { useMemo, useState } from 'react';
import { WordsMap } from '~/types/word';
import { ShowMoreButton } from './ShowMoreButton';
import { RecentlyAddedWord } from './RecentlyAddedWord';

type Props = {
  words: WordsMap;
};
export const RecentlyAddedWordsContainer = ({ words }: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  const [wordIndex, setWordIndex] = useState(1);

  const handleShowMore = () => {
    setWordIndex((prevState) => prevState + 1);
  };

  const recentlyAddedWords = useMemo(() => {
    return Array.from(words.values()).slice(0, wordIndex);
  }, [words, wordIndex]);

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
      {isOpen &&
        recentlyAddedWords.map((word) => (
          <RecentlyAddedWord key={word.id} word={word} />
        ))}
      <ShowMoreButton onClick={handleShowMore} />
    </div>
  );
};
