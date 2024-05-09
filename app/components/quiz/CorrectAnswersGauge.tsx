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
  correctAnswerNum: number;
};

export const CorrectAnswersGauge = ({ correctAnswerNum }: Props) => {
  const fillPercentage = useMemo(() => {
    return (correctAnswerNum / TOTAL_QUESTIONS) * 100;
  }, [correctAnswerNum]);

  const offset = useMemo(() => {
    return GAUGE_CIRCUMFERENCE - (fillPercentage / 100) * GAUGE_CIRCUMFERENCE;
  }, [fillPercentage]);

  return (
    <div className="flex items-center justify-center size-72">
      <svg className="size-36" viewBox="0 0 180 180">
        <circle
          cx={GAUGE_CX}
          cy={GAUGE_CY}
          r={GAUGE_RADIUS}
          fill="transparent"
          stroke="#ddd"
          strokeWidth="15"
        />
        <motion.circle
          cx={GAUGE_CX}
          cy={GAUGE_CY}
          r={GAUGE_RADIUS}
          fill="transparent"
          stroke="green"
          strokeWidth="15"
          strokeDasharray={GAUGE_CIRCUMFERENCE}
          strokeDashoffset={GAUGE_CIRCUMFERENCE}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        />
        <text
          x="50%" // 中心に配置
          y="50%" // 中心に配置
          dy=".45em" // 垂直位置の微調整
          textAnchor="middle" // テキストを中心に配置
          fontSize="30" // フォントサイズの設定
          fill="black" // フォントカラー
        >
          {correctAnswerNum} / {TOTAL_QUESTIONS}
        </text>
      </svg>
    </div>
  );
};
