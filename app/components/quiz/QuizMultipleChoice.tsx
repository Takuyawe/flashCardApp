import { useMemo } from 'react';
import { shuffleMultipleChoice } from '~/modules/quiz/shuffleMultipleChoice';
import { QuizWord } from '~/types/quiz';

type Props = {
  quizWord: QuizWord;
};

export const QuizMultipleChoice = ({ quizWord }: Props) => {
  const multipleChoice = useMemo(() => {
    const joinedArray = [{ ...quizWord }, ...quizWord.multipleChoice];
    return shuffleMultipleChoice(joinedArray);
  }, [quizWord]);

  return (
    <div className="flex w-full flex-wrap justify-center gap-3 mt-5">
      {multipleChoice.map((option) => (
        <button
          key={option.word}
          className="h-8 w-24 border border-base-dark rounded-full text-sm">
          {option.definition}
        </button>
      ))}
    </div>
  );
};
