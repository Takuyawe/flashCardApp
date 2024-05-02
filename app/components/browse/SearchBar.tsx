import { useMemo, useState } from 'react';
import { SearchResults } from './SearchResults';
import { useRecoilState } from 'recoil';
import { wordsAtom } from '~/atoms/atom';
import { searchWithKMP } from '~/modules/browse/searchWithKMP';
import { AnimatePresence } from 'framer-motion';

export const SearchBar = () => {
  const [words] = useRecoilState(wordsAtom);
  const [text, setText] = useState<string>('');
  const [isResultBoxOpen, setIsResultBoxOpen] = useState<boolean>(false);

  const searchMatchedWords = useMemo(() => {
    const matchedWords = [];
    if (text) {
      for (const word of words.values()) {
        const result = searchWithKMP(word.name, text);
        if (result !== -1) {
          matchedWords.push(word);
        }
      }
    }
    return matchedWords;
  }, [text, words]);

  return (
    <div className="relative">
      <div className="relative">
        <i className="ri-search-line text-xl absolute left-2 top-1 opacity-75" />
        <input
          name="search"
          value={text}
          onChange={(e) => {
            if (e.target.value !== '') {
              setIsResultBoxOpen(true);
            }
            setText(e.target.value);
          }}
          placeholder="Search a word"
          className="h-9 w-72 border-2 border-base-dark rounded-md pl-8 text-md"
        />
        <button onClick={() => setText('')}>
          <i className="ri-close-line text-xl absolute right-2 top-1 opacity-75" />
        </button>
      </div>
      <AnimatePresence>
        {text && isResultBoxOpen && (
          <SearchResults
            setText={setText}
            searchMatchedWords={searchMatchedWords}
            setIsResultBoxOpen={setIsResultBoxOpen}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
