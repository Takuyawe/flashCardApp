import { useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  quizCorrectAnswerCountAtom,
  quizSelectedWordListAtom,
} from '~/atoms/atom';
import { QuizWord } from '~/types/quiz';
import { WordCard } from './WordCard';
import { AnimatePresence } from 'framer-motion';

type Props = {
  word: QuizWord;
  index: number;
  isSelectEnabled: boolean;
};

export const ResultWord = ({ word, index, isSelectEnabled }: Props) => {
  const [quizCorrectAnswerCount] = useRecoilState(quizCorrectAnswerCountAtom);
  const [isWordExpanded, setIsWordExpanded] = useState<boolean>(false);
  const [quizSelectedWordList, setQuizSelectedWordList] = useRecoilState(
    quizSelectedWordListAtom
  );

  const isColoredBlue = useMemo(() => {
    return quizSelectedWordList.includes(word);
  }, [quizSelectedWordList, word]);

  return (
    <>
      <button
        onClick={() => {
          if (isSelectEnabled) {
            setQuizSelectedWordList((prevState) => {
              if (prevState.includes(word)) {
                return prevState.filter((item) => item !== word);
              } else {
                return [...prevState, word];
              }
            });
            return;
          }
          setIsWordExpanded((prevState) => !prevState);
        }}
        className={`flex items-center gap-x-2 pl-1 border border-base-dark rounded-sm ${
          isColoredBlue && 'bg-blue-200'
        }`}
        key={word.definition}>
        {quizCorrectAnswerCount[index] === 0 ? (
          <i className="ri-close-line text-xl text-bright-red" />
        ) : (
          <i className="ri-circle-line text-xl text-bright-green" />
        )}
        <span className="text-base-dark text-sm">
          {word.word} / {word.definition}
        </span>
        {!isSelectEnabled && (
          <div className="ml-auto mr-3">
            {isWordExpanded ? (
              <i className="ri-arrow-down-wide-line" />
            ) : (
              <i className="ri-arrow-up-wide-line" />
            )}
          </div>
        )}
      </button>
      <AnimatePresence>
        {isWordExpanded && <WordCard word={word} />}
      </AnimatePresence>
    </>
  );
};
