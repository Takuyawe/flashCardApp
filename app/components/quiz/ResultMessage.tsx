import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { getResultMessage } from '~/modules/quiz/getResultMessage';

type Props = {
  correctAnswerNum: number;
};

export const ResultMessage = ({ correctAnswerNum }: Props) => {
  const message = useMemo(() => {
    return getResultMessage(correctAnswerNum);
  }, [correctAnswerNum]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-80 text-bright-green text-md">
      {message}
    </motion.div>
  );
};
