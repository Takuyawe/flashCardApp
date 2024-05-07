import { motion } from 'framer-motion';
import { TabsContent } from '~/@/components/ui/tabs';

type Props = {
  value: string;
  categoryList: string[];
};

export const CategoryPickTabContent = ({ value, categoryList }: Props) => {
  return (
    <TabsContent value={value}>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-y-4 mt-10">
        {categoryList.map((category) => (
          <button
            className="h-10 w-64 bg-green-500 text-white rounded-md"
            key={category}>
            {category}
          </button>
        ))}
      </motion.div>
    </TabsContent>
  );
};
