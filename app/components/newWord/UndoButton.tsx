import { Word } from '@prisma/client';
import { useFetcher } from '@remix-run/react';
import { motion } from 'framer-motion';
import React from 'react';
import { action } from '~/routes/users.$userId.word.delete';

type Props = {
  isWordUndone: boolean;
  setIsWordUndone: React.Dispatch<React.SetStateAction<boolean>>;
  setIsUndoButtonOpen: React.Dispatch<React.SetStateAction<boolean>>;
  newWord: Word;
};

export const UndoButton = ({
  isWordUndone,
  setIsWordUndone,
  setIsUndoButtonOpen,
  newWord,
}: Props) => {
  const fetcher = useFetcher<typeof action>();

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      exit={{ y: -100 }}
      className="absolute top-0 h-20 w-40 bg-white border-x border-b border-base-dark rounded-md">
      <div className="flex flex-col justify-center items-center gap-y-2 h-full">
        <span className="text-base-dark">
          {isWordUndone ? 'Word Deleted!' : 'Word Added!'}
        </span>
        <div className="flex gap-x-2">
          <fetcher.Form method="delete" action="delete">
            <input type="hidden" name="wordId" value={newWord.id} />
            <button
              onClick={() => {
                setIsWordUndone(true);
              }}
              className="bg-base-dark text-white rounded-md text-sm py-1 px-2">
              Undo
            </button>
          </fetcher.Form>
          <button
            onClick={() => setIsUndoButtonOpen(false)}
            className="bg-white text-base-dark ring-1 ring-base-dark rounded-md text-sm px-2">
            Close
          </button>
        </div>
      </div>
    </motion.div>
  );
};
