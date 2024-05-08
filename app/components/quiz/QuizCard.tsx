import { useRecoilState } from 'recoil';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '~/@/components/ui/carousel';
import {
  quizCategoryAtom,
  quizIndexAtom,
  quizWordListAtom,
} from '~/atoms/atom';
import { QuizMultipleChoice } from './QuizMultipleChoice';

export const QuizCard = () => {
  const [quizWordList] = useRecoilState(quizWordListAtom);
  const [quizCategory, setQuizCategory] = useRecoilState(quizCategoryAtom);
  const [quizIndex] = useRecoilState(quizIndexAtom);

  return (
    <div className="">
      <Carousel className="w-60">
        <CarouselContent>
          {quizWordList.map((quizWord) => (
            <CarouselItem className="" key={quizWord.word}>
              <div className="flex items-center justify-center border border-base-dark bg-white h-36 w-60 rounded-lg shadow-md">
                <span className="text-2xl">{quizWord.word}</span>
              </div>
              <QuizMultipleChoice quizWord={quizWord} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};