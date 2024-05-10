import { useRecoilState } from 'recoil';
import { quizCategoryAtom, quizWordListAtom } from '~/atoms/atom';
import { ResultWord } from './ResultWord';
import { useState } from 'react';
import { CategoriesList } from './CategoriesList';
import { AnimatePresence } from 'framer-motion';

export const ResultWordsContainer = () => {
  // const [quizWordList] = useRecoilState(quizWordListAtom);
  const [quizCategory] = useRecoilState(quizCategoryAtom);
  const [isSelectEnabled, setIsSelectEnabled] = useState<boolean>(false);

  const quizWordList = [
    {
      word: 'たべもの',
      kana: 'たべもの',
      definition: 'food',
      multipleChoice: [
        {
          word: '野菜',
          kana: 'やさい',
          definition: 'vegetable',
          isCorrectAnswer: false,
        },
        {
          word: 'のみもの',
          kana: 'のみもの',
          definition: 'drinks',
          isCorrectAnswer: false,
        },
        {
          word: '果物',
          kana: 'くだもの',
          definition: 'fruits',
          isCorrectAnswer: false,
        },
      ],
      isCorrectAnswer: true,
    },
    {
      word: 'しょくひん',
      kana: 'しょくひん',
      definition: 'commodity',
      multipleChoice: [
        {
          word: 'たべもの',
          kana: 'たべもの',
          definition: 'food',
          isCorrectAnswer: false,
        },
        {
          word: 'たべもの',
          kana: 'たべもの',
          definition: 'food',
          isCorrectAnswer: false,
        },
        {
          word: 'たべもの',
          kana: 'たべもの',
          definition: 'food',
          isCorrectAnswer: false,
        },
      ],
      isCorrectAnswer: true,
    },
  ];

  return (
    <div className="flex flex-col w-96 gap-y-1">
      <div className="flex justify-between items-center">
        <span className="text-base-dark">Category: {quizCategory}</span>
        <div className="flex gap-x-2 items-center">
          <button
            onClick={() => setIsSelectEnabled((prevState) => !prevState)}
            className="h-5 w-12 text-xs bg-base-dark text-white rounded-full ">
            select
          </button>
          <button>
            <i className="ri-folder-reduce-line text-xl" />
          </button>
        </div>
      </div>
      <div className={`flex ${isSelectEnabled && 'divide-x-2 gap-x-3'}`}>
        <div
          className={`flex flex-col gap-y-1 ${
            isSelectEnabled ? 'w-1/2' : 'w-full'
          }`}>
          {quizWordList.map((word, index) => (
            <ResultWord
              key={word.definition}
              word={word}
              index={index}
              isSelectEnabled={isSelectEnabled}
            />
          ))}
        </div>
        <AnimatePresence>
          {isSelectEnabled && <CategoriesList />}
        </AnimatePresence>
      </div>
    </div>
  );
};
