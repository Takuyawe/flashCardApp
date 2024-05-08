import { useRecoilState } from 'recoil';
import { quizIndexAtom } from '~/atoms/atom';

export const QuizStepper = () => {
  const [quizIndex] = useRecoilState(quizIndexAtom);
  return (
    <div className="flex gap-x-2">
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          className={`grid place-items-center size-7 rounded-full text-sm ${
            quizIndex - index + 1 > 0
              ? 'bg-base-dark text-white'
              : 'bg-white text-base-dark'
          }`}
          key={index}>
          {index + 1}
        </div>
      ))}
    </div>
  );
};
