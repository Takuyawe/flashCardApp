import { CategoryInput } from '~/components/quiz/CategoryInput';
import { CategoryPick } from '~/components/quiz/CategoryPick';

export default function Index() {
  return (
    <div className="flex flex-col items-center justify-around h-4/5 w-full">
      <CategoryPick />
      <CategoryInput />
    </div>
  );
}
