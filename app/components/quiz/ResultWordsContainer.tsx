import { useRecoilState } from 'recoil';
import { quizCategoryAtom, quizWordListAtom } from '~/atoms/atom';
import { ResultWord } from './ResultWord';

export const ResultWordsContainer = () => {
  // const [quizWordList] = useRecoilState(quizWordListAtom);
  const [quizCategory] = useRecoilState(quizCategoryAtom);

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
      <div className="flex justify-between">
        <span className="text-base-dark">Category: {quizCategory}</span>
        <div className="flex gap-x-2">
          <button className="px-3 text-xs bg-base-dark text-white rounded-full ">
            select
          </button>
          <button>
            <i className="ri-folder-reduce-line text-xl" />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-y-1">
        {quizWordList.map((word, index) => (
          <ResultWord key={word.definition} word={word} index={index} />
        ))}
      </div>
    </div>
  );
};
