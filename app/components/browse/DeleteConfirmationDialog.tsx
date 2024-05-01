import { useFetcher } from '@remix-run/react';
import { motion } from 'framer-motion';
import { getCategoryPath } from '~/modules/path/getCategoryPath';
import { action } from '~/routes/users.$userId.browse.$category.delete';

type Props = {
  category: string;
  userId: string;
  categoryId: string;
  onClose: () => void;
};

export const DeleteConfirmationDialog = ({
  category,
  userId,
  categoryId,
  onClose,
}: Props) => {
  const fetcher = useFetcher<typeof action>();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute h-36 w-60 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-white shadow-lg rounded-lg">
      <div className="flex flex-col items-center justify-center h-full gap-y-2">
        <span>Delete this category ?</span>
        <div className="flex gap-x-1 ">
          <i className="ri-folder-fill text-bright-blue text-xl" />
          <span className="text-lg">{category}</span>
        </div>
        <div className="flex gap-x-5 mt-3">
          <button
            onClick={onClose}
            className="h-6 w-16 bg-white text-base-dark ring-1 ring-base-dark rounded-xl text-sm">
            Cancel
          </button>
          <fetcher.Form
            method="delete"
            action={`${getCategoryPath(userId, categoryId)}/delete`}>
            <input type="hidden" name="categoryId" value={categoryId} />
            <button
              type="submit"
              className="h-6 w-16 bg-base-dark text-white rounded-xl text-sm">
              Delete
            </button>
          </fetcher.Form>
        </div>
      </div>
    </motion.div>
  );
};
