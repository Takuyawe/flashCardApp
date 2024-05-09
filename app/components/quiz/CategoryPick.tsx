import { Tabs } from '~/@/components/ui/tabs';
import { LevelPickTab } from './LevelPickTab';
import { CategoryPickTabContent } from './CategoryPickTabContent';
import {
  EASY_CATEGORIES,
  HARD_CATEGORIES,
  NORMAL_CATEGORIES,
} from '~/constants/Quiz';

export const CategoryPick = () => {
  return (
    <Tabs defaultValue="easy" className="w-80">
      <LevelPickTab />
      <CategoryPickTabContent value="easy" categoryList={EASY_CATEGORIES} />
      <CategoryPickTabContent value="normal" categoryList={NORMAL_CATEGORIES} />
      <CategoryPickTabContent value="hard" categoryList={HARD_CATEGORIES} />
    </Tabs>
  );
};
