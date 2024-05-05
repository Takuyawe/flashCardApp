import { useMemo, useState } from "react";
import { SearchResults } from "./SearchResults";
import { useRecoilState } from "recoil";
import { wordsAtom } from "~/atoms/atom";
import { AnimatePresence } from "framer-motion";
import { stringSimilarity } from "string-similarity-js";

export const SearchBar = () => {
  const [words] = useRecoilState(wordsAtom);
  const [text, setText] = useState<string>("");
  const [isResultBoxOpen, setIsResultBoxOpen] = useState<boolean>(false);

  const searchMatchedWords = useMemo(() => {
    const matchedWordsArr = [];
    if (text) {
      for (const word of words.values()) {
        for (const attribute of [word.name, word.definition, word.kana]) {
          const matchedDegree = stringSimilarity(attribute, text, 1);
          if (matchedDegree > 0.25) {
            matchedWordsArr.push({ word, matchedDegree });
            break;
          }
        }
      }
    }
    const sortedMatchedWordsArr = matchedWordsArr
      .sort((a, b) => b.matchedDegree - a.matchedDegree)
      .map((item) => item.word)
      .splice(0, 5);
    return new Map(sortedMatchedWordsArr.map((word) => [word.id, word]));
  }, [text, words]);

  return (
    <div className="relative">
      <div className="relative">
        <i className="ri-search-line text-xl absolute left-2 top-1 opacity-75" />
        <input
          name="search"
          value={text}
          onChange={(e) => {
            if (e.target.value !== "") {
              setIsResultBoxOpen(true);
            }
            setText(e.target.value);
          }}
          placeholder="Search a word"
          className="h-9 w-72 border-2 border-base-dark rounded-md pl-8 text-md"
        />
        {text && (
          <button onClick={() => setText("")}>
            <i className="ri-close-line text-xl absolute right-2 top-1 opacity-75" />
          </button>
        )}
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
