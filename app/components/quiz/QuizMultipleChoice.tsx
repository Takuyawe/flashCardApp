import { Link } from '@remix-run/react';
import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';
import { quizCorrectAnswerCountAtom, userAtom } from '~/atoms/atom';
import { getQuizResultPath } from '~/modules/path/getQuizResultPath';
import { shuffleMultipleChoice } from '~/modules/quiz/shuffleMultipleChoice';
import { QuizWord } from '~/types/quiz';

type Props = {
  quizWord: QuizWord;
};

export const QuizMultipleChoice = ({ quizWord }: Props) => {
  const [user] = useRecoilState(userAtom);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isAllAnswered, setIsAllAnswered] = useState<boolean>(false);
  const [, setQuizCorrectAnswerCount] = useRecoilState(
    quizCorrectAnswerCountAtom
  );

  const multipleChoice = useMemo(() => {
    const joinedArray = [{ ...quizWord }, ...quizWord.multipleChoice];
    return shuffleMultipleChoice(joinedArray);
  }, [quizWord]);

  return (
    <div className="flex flex-wrap justify-center gap-4 mt-10">
      {multipleChoice.map((option) =>
        isAnswered ? (
          <div
            key={option.word}
            className={`flex items-center justify-center h-10 w-full rounded-full text-md shadow-md text-white ${
              option.isCorrectAnswer ? 'bg-bright-green' : 'bg-bright-red'
            }`}>
            <span className="flex items-center justify-start w-full gap-x-2 ml-4">
              {option.isCorrectAnswer ? (
                <i className="ri-circle-line text-2xl" />
              ) : (
                <i className="ri-close-line text-2xl" />
              )}
              {option.definition} / {option.kana}
            </span>
          </div>
        ) : (
          <button
            key={option.word}
            onClick={() => {
              setIsAnswered(true);
              setQuizCorrectAnswerCount((prev) => {
                if (prev.length === 9) setIsAllAnswered(true);
                return [...prev, option.isCorrectAnswer ? 1 : 0];
              });
            }}
            className="h-10 w-full border border-base-dark rounded-full text-md shadow-md">
            {option.definition}
          </button>
        )
      )}
      {isAllAnswered && (
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="h-8 w-full mt-10">
          <Link
            to={getQuizResultPath(user?.id as string)}
            className="h-full grid place-items-center bg-base-dark rounded-md text-white tracking-widest">
            FINISH
          </Link>
        </motion.div>
      )}
    </div>
  );
};
