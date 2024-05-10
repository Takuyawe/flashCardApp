import { Word } from '@prisma/client';
import { motion } from 'framer-motion';
import { speakWord } from '~/modules/browse/speakWord';

type Props = {
  word: Word;
};

export const WordCard = ({ word }: Props) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="min-h-32 h-auto w-96 rounded-sm border border-base-dark px-2 py-2">
      <div className="flex items-center justify-start gap-x-2">
        <button onClick={() => speakWord(word.word)}>
          <i className="ri-speak-fill text-lg" />
        </button>
        <span className="text-sm">
          {word.word} ({word.kana}) /{' '}
          {word.definition.replaceAll('.', '').replaceAll(`"`, '')}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="text-xs">Example sentence</span>
        <div className="w-1/2 border-t border-base-dark " />
        <div className="flex flex-col gap-y-1 mt-1">
          <span className="text-xs">{word.exampleSentence}</span>
          <span className="text-xs">{word.exampleSentenceKana}</span>
          <span className="text-xs">{word.exampleSentenceRomaji}</span>
          <span className="text-xs">{word.exampleSentenceTranslation}</span>
        </div>
      </div>
    </motion.div>
  );
};
