import { useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { quizCorrectAnswerCountAtom } from '~/atoms/atom';
import { CorrectAnswersGauge } from '~/components/quiz/CorrectAnswersGauge';
import { ResultMessage } from '~/components/quiz/ResultMessage';
import { ResultWordsContainer } from '~/components/quiz/ResultWordsContainer';

export default function Layout() {
  const [quizCorrectAnswerCount] = useRecoilState(quizCorrectAnswerCountAtom);

  const correctAnswerNumber = useMemo(() => {
    return quizCorrectAnswerCount.filter((num) => num === 1).length;
  }, [quizCorrectAnswerCount]);

  return (
    <div className="flex flex-col h-5/6 w-full items-center gap-y-4 overflow-y-auto mt-5">
      <ResultMessage correctAnswerNum={correctAnswerNumber} />
      <CorrectAnswersGauge correctAnswerNum={correctAnswerNumber} />
      <ResultWordsContainer />
    </div>
  );
}
