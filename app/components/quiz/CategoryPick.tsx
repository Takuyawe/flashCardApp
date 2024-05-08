import { Tabs } from '~/@/components/ui/tabs';
import { LevelPickTab } from './LevelPickTab';
import { CategoryPickTabContent } from './CategoryPickTabContent';
import {
  EASY_CATEGORIES,
  HARD_CATEGORIES,
  NORMAL_CATEGORIES,
} from '~/constants/Quiz';
import { QuizLevel } from '~/types/quiz';
import { useRecoilState } from 'recoil';
import { quizLevelAtom } from '~/atoms/atom';

export const CategoryPick = () => {
  const [quizLevel, setQuizLevel] = useRecoilState(quizLevelAtom);

  return (
    <Tabs
      defaultValue={quizLevel}
      onValueChange={(value) => setQuizLevel(value as QuizLevel)}
      className="w-80">
      <LevelPickTab />
      <CategoryPickTabContent value="easy" categoryList={EASY_CATEGORIES} />
      <CategoryPickTabContent value="normal" categoryList={NORMAL_CATEGORIES} />
      <CategoryPickTabContent value="hard" categoryList={HARD_CATEGORIES} />
    </Tabs>
  );
};
