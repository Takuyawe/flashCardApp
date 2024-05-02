import { Link } from '@remix-run/react';
import { useCallback, useState } from 'react';
import { useRecoilState } from 'recoil';
import { chosenCategoryIdAtom, userAtom } from '~/atoms/atom';
import { getWordCategoryPath } from '~/modules/path/getWordCategoryPath';
import { CategoryWithChildren } from '~/types/word';
import { Modal } from '../modal/Modal';
import { DeleteConfirmationDialog } from './DeleteConfirmationDialog';
import { DraggableFolder } from './DraggableFolder';
import { DndProvider } from 'react-dnd-multi-backend';
import { HTML5toTouch } from 'rdndmb-html5-to-touch';
import CustomDragLayer from './CustomDragLayer';

type Props = {
  category: CategoryWithChildren;
};

export const CategoryItem = ({ category }: Props) => {
  const [isDeleteConfirmationDialogOpen, setIsDeleteConfirmationDialogOpen] =
    useState<boolean>(false);
  const [isChildrenOpen, setIsChildrenOpen] = useState(true);
  const [user] = useRecoilState(userAtom);
  const [, setChosenCategoryId] = useRecoilState(chosenCategoryIdAtom);

  const closeDeleteConfirmationDialog = useCallback(() => {
    setIsDeleteConfirmationDialogOpen(false);
  }, []);

  return (
    <div className="flex flex-col gap-y-1">
      <div className="flex items-center gap-x-2">
        <button
          onClick={() => setIsChildrenOpen(!isChildrenOpen)}
          className="flex items-center justify-center">
          {category.childCategories &&
          category.childCategories.length > 0 &&
          !isChildrenOpen ? (
            <i className="ri-arrow-right-s-line text-2xl" />
          ) : (
            <i className="ri-arrow-down-s-line text-2xl" />
          )}
        </button>
        <Link
          to={getWordCategoryPath(
            user?.id as string,
            category.name,
            category.id
          )}
          className="border-b w-full">
          <DndProvider options={HTML5toTouch}>
            <DraggableFolder
              category={category}
              setChosenCategoryId={setChosenCategoryId}
            />
            <CustomDragLayer />
          </DndProvider>
        </Link>
        <button
          onClick={() => setIsDeleteConfirmationDialogOpen(true)}
          className="transform -translate-x-7">
          <i className="ri-delete-bin-line" />
        </button>
        {isDeleteConfirmationDialogOpen && (
          <Modal isOpen={isDeleteConfirmationDialogOpen}>
            <DeleteConfirmationDialog
              category={category.name}
              userId={user?.id as string}
              categoryId={category.id}
              onClose={closeDeleteConfirmationDialog}
            />
          </Modal>
        )}
      </div>
      {isChildrenOpen &&
        category.childCategories &&
        category.childCategories.length > 0 && (
          <div className="ml-4">
            {category.childCategories.map((childCategory) => (
              <CategoryItem key={childCategory.id} category={childCategory} />
            ))}
          </div>
        )}
    </div>
  );
};
