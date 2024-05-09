import { useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { quizCategoryAtom, quizCorrectAnswerCountAtom } from '~/atoms/atom';
import { CorrectAnswersGauge } from '~/components/quiz/CorrectAnswersGauge';
import { ResultMessage } from '~/components/quiz/ResultMessage';

export default function Layout() {
  const [quizCategory, setQuizCategory] = useRecoilState(quizCategoryAtom);
  const [quizCorrectAnswerCount, setQuizCorrectAnswerCount] = useRecoilState(
    quizCorrectAnswerCountAtom
  );

  const correctAnswerNumber = useMemo(() => {
    return quizCorrectAnswerCount.filter((num) => num === 1).length;
  }, [quizCorrectAnswerCount]);

  return (
    <div className="flex flex-col w-full items-center justify-center">
      <ResultMessage correctAnswerNum={correctAnswerNumber} />
      <CorrectAnswersGauge correctAnswerNum={correctAnswerNumber} />
    </div>
  );
}
