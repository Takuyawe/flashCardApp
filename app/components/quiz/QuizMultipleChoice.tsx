import { useMemo, useState } from 'react';
import { shuffleMultipleChoice } from '~/modules/quiz/shuffleMultipleChoice';
import { QuizWord } from '~/types/quiz';

type Props = {
  quizWord: QuizWord;
};

export const QuizMultipleChoice = ({ quizWord }: Props) => {
  const [isAnswered, setIsAnswered] = useState<boolean>(false);

  const multipleChoice = useMemo(() => {
    const joinedArray = [{ ...quizWord }, ...quizWord.multipleChoice];
    return shuffleMultipleChoice(joinedArray);
  }, [quizWord]);

  return (
    <div className="flex w-full flex-wrap justify-center gap-4 mt-5">
      {multipleChoice.map((option) =>
        isAnswered ? (
          <div
            key={option.word}
            className={`flex items-center justify-center h-10 w-60 rounded-full text-md shadow-md text-white ${
              option.isCorrectAnswer ? 'bg-bright-green' : 'bg-bright-red'
            }`}>
            <span className="flex items-center justify-start w-full gap-x-2 ml-4">
              {option.isCorrectAnswer ? (
                <i className="ri-circle-line text-2xl" />
              ) : (
                <i className="ri-close-line text-2xl" />
              )}
              {option.definition}
            </span>
          </div>
        ) : (
          <button
            key={option.word}
            onClick={() => setIsAnswered(true)}
            className="h-10 w-60 border border-base-dark rounded-full text-md shadow-md">
            {option.definition}
          </button>
        )
      )}
    </div>
  );
};
