import { Link } from '@remix-run/react';
import { motion } from 'framer-motion';
import { useRecoilState } from 'recoil';
import { TabsContent } from '~/@/components/ui/tabs';
import { quizLevelAtom } from '~/atoms/atom';
import { getQuizPath } from '~/modules/path/getQuizPath';

type Props = {
  value: string;
  categoryList: string[];
};

export const CategoryPickTabContent = ({ value, categoryList }: Props) => {
  const [quizLevel] = useRecoilState(quizLevelAtom);

  return (
    <TabsContent value={value}>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-y-4 mt-10">
        {categoryList.map((category) => (
          <Link to={getQuizPath(category, quizLevel)} key={category}>
            <button className="h-10 w-64 bg-green-500 text-white rounded-md">
              {category}
            </button>
          </Link>
        ))}
      </motion.div>
    </TabsContent>
  );
};
