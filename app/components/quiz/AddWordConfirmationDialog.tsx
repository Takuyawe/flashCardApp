import { useFetcher } from '@remix-run/react';
import { motion } from 'framer-motion';
import { useRecoilState } from 'recoil';
import {
  quizAlreadySavedListAtom,
  quizSelectedWordListAtom,
  userAtom,
} from '~/atoms/atom';
import { ADD_WORDS } from '~/constants/ActionPath';
import { action } from '~/routes/addWords';

type Props = {
  category: string;
  categoryId: string;
  onClose: () => void;
};

export const AddWordConfirmationDialog = ({
  category,
  categoryId,
  onClose,
}: Props) => {
  const fetcher = useFetcher<typeof action>();
  const [user] = useRecoilState(userAtom);
  const [quizSelectedWordList, setQuizSelectedWordList] = useRecoilState(
    quizSelectedWordListAtom
  );
  const [, setQuizAlreadySavedList] = useRecoilState(quizAlreadySavedListAtom);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute py-5 min-h-36 h-auto w-80 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-white shadow-lg rounded-lg">
      <div className="flex flex-col items-center justify-center h-full gap-y-2">
        <span>
          {quizSelectedWordList.length === 1
            ? 'Add this word?'
            : 'Add these words?'}
        </span>
        <div className="flex w-full gap-x-3 my-3 justify-center">
          <div className="flex flex-col items-center justify-center gap-y-1">
            {quizSelectedWordList.map((word) => (
              <div key={word.definition} className="flex gap-x-1 items-center">
                <i className="ri-file-list-line" />
                <span className="text-sm">{word.word}</span>
              </div>
            ))}
          </div>
          <i className="ri-arrow-right-line text-xl self-center mx-3" />
          <div className="flex gap-x-1 items-center">
            <i className="ri-folder-fill text-bright-blue text-xl" />
            <span className="text-sm">{category}</span>
          </div>
        </div>
        <div className="flex gap-x-5 mt-3">
          <button
            onClick={onClose}
            className="h-6 w-16 bg-white text-base-dark ring-1 ring-base-dark rounded-xl text-sm">
            Cancel
          </button>
          <fetcher.Form
            method="post"
            action={ADD_WORDS}
            onSubmit={() => {
              setQuizAlreadySavedList((prevState) => [
                ...prevState,
                ...quizSelectedWordList,
              ]);
              setQuizSelectedWordList([]);
              onClose();
            }}>
            <input type="hidden" name="userId" value={user?.id as string} />
            <input type="hidden" name="categoryId" value={categoryId} />
            <input
              type="hidden"
              name="words"
              value={JSON.stringify(quizSelectedWordList)}
            />
            <button
              type="submit"
              className="h-6 w-16 bg-base-dark text-white rounded-xl text-sm">
              Add
            </button>
          </fetcher.Form>
        </div>
      </div>
    </motion.div>
  );
};
