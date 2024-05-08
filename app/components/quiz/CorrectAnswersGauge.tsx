import { motion } from 'framer-motion';
import { useMemo } from 'react';
import {
  GAUGE_CIRCUMFERENCE,
  GAUGE_CX,
  GAUGE_CY,
  GAUGE_RADIUS,
  TOTAL_QUESTIONS,
} from '~/constants/Quiz';

type Props = {
  correctAnswers: number;
};

export const CorrectAnswersGauge = ({ correctAnswers }: Props) => {
  const fillPercentage = useMemo(() => {
    return (correctAnswers / TOTAL_QUESTIONS) * 100;
  }, [correctAnswers]);

  const offset = useMemo(() => {
    return GAUGE_CIRCUMFERENCE - (fillPercentage / 100) * GAUGE_CIRCUMFERENCE;
  }, [fillPercentage]);

  return (
    <div className="flex items-center justify-center size-48">
      <svg className="size-24" viewBox="0 0 120 120">
        <circle
          cx={GAUGE_CX}
          cy={GAUGE_CY}
          r={GAUGE_RADIUS}
          fill="transparent"
          stroke="#ddd"
          strokeWidth="10"
        />
        <motion.circle
          cx={GAUGE_CX}
          cy={GAUGE_CY}
          r={GAUGE_RADIUS}
          fill="transparent"
          stroke="green"
          strokeWidth="10"
          strokeDasharray={GAUGE_CIRCUMFERENCE}
          strokeDashoffset={GAUGE_CIRCUMFERENCE}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        />
      </svg>
    </div>
  );
};
