import { useFetcher, useLocation } from '@remix-run/react';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { getMoveCategoryActionPath } from '~/modules/path/getMoveCategoryActionPath';
import { action } from '~/routes/users.$userId.browse.$category.move';

type Props = {
  currentCategoryId: string;
  currentCategoryName: string;
  targetCategoryId: string;
  targetCategoryName: string;
  onClose: () => void;
};

export const MoveCategoryConfirmationDialog = ({
  currentCategoryId,
  currentCategoryName,
  targetCategoryId,
  targetCategoryName,
  onClose,
}: Props) => {
  const fetcher = useFetcher<typeof action>();
  const location = useLocation();

  useEffect(() => {
    if (!fetcher.data) return;
    onClose();
  }, [fetcher.data, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute h-36 w-60 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-white shadow-lg rounded-lg">
      <div className="flex flex-col items-center justify-center h-full gap-y-2">
        <span>Move this category ?</span>
        <div className="flex gap-x-2 items-center">
          <div className="flex gap-x-1 items-center">
            <i className="ri-folder-fill text-bright-blue text-xl" />
            <span className="text-md">{currentCategoryName}</span>
          </div>
          <i className="ri-arrow-right-double-fill text-xl" />
          <div className="flex gap-x-1 items-center">
            <i className="ri-folder-fill text-bright-blue text-xl" />
            <span className="text-md">{targetCategoryName}</span>
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
            action={`${getMoveCategoryActionPath(
              location.pathname,
              targetCategoryId
            )}`}>
            <input
              type="hidden"
              name="currentCategoryId"
              value={currentCategoryId}
            />
            <input
              type="hidden"
              name="targetCategoryId"
              value={targetCategoryId}
            />
            <button
              type="submit"
              className="h-6 w-16 bg-base-dark text-white rounded-xl text-sm">
              Move
            </button>
          </fetcher.Form>
        </div>
      </div>
    </motion.div>
  );
};
