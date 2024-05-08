import { useRecoilState } from 'recoil';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '~/@/components/ui/carousel';
import { quizCategoryAtom, quizWordListAtom } from '~/atoms/atom';
import { QuizMultipleChoice } from './QuizMultipleChoice';

type Props = {
  setQuizIndex: React.Dispatch<React.SetStateAction<number>>;
};

export const QuizCard = ({ setQuizIndex }: Props) => {
  const [quizWordList] = useRecoilState(quizWordListAtom);
  const [quizCategory, setQuizCategory] = useRecoilState(quizCategoryAtom);

  return (
    <div className="">
      <Carousel className="w-60">
        <CarouselContent className="">
          {quizWordList.map((quizWord) => (
            <CarouselItem className="" key={quizWord.word}>
              <div className="flex items-center justify-center border border-base-dark bg-white h-36 w-60 rounded-lg">
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
