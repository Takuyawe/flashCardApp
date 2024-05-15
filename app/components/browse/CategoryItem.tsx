import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { chosenCategoryIdAtom, userAtom } from '~/atoms/atom';
import { CategoryWithChildren } from '~/types/word';
import { Modal } from '../modal/Modal';
import { DeleteConfirmationDialog } from './DeleteConfirmationDialog';
import { DraggableFolder } from './DraggableFolder';
import { DndProvider } from 'react-dnd';
import { HTML5toTouch } from 'rdndmb-html5-to-touch';
import { MultiBackend } from 'react-dnd-multi-backend';
import CustomDragLayer from './CustomDragLayer';
import { useFetcher } from '@remix-run/react';
import { ADD_CATEGORY, EDIT_CATEGORY_NAME } from '~/constants/ActionPath';

type Props = {
  category: CategoryWithChildren;
  categoryId?: string | null;
};

export const CategoryItem = ({ category, categoryId }: Props) => {
  const [isDeleteConfirmationDialogOpen, setIsDeleteConfirmationDialogOpen] =
    useState<boolean>(false);
  const [isChildrenOpen, setIsChildrenOpen] = useState(
    category.parentCategoryId === null || categoryId === category.id
  );
  const [user] = useRecoilState(userAtom);
  const [, setChosenCategoryId] = useRecoilState(chosenCategoryIdAtom);
  const addCategoryFetcher = useFetcher();
  const editCategoryFetcher = useFetcher();
  const [isAddingCategory, setIsAddingCategory] = useState<boolean>(false);
  const [newCategoryName, setNewCategoryName] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingText, setEditingText] = useState<string>(category.name);

  return (
    <div className="flex flex-col gap-y-1">
      <div className="flex items-center gap-x-2 border-b">
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
        {isEditing ? (
          <div className="flex gap-x-1">
            <i className="ri-folder-fill text-bright-blue text-xl" />
            <input
              autoFocus
              className="text-md w-32 pl-1"
              type="text"
              value={editingText}
              onChange={(e) => setEditingText(e.target.value)}
            />
          </div>
        ) : (
          <DndProvider backend={MultiBackend} options={HTML5toTouch}>
            <DraggableFolder
              category={category}
              setChosenCategoryId={setChosenCategoryId}
            />
            <CustomDragLayer />
          </DndProvider>
        )}
        <div className="flex gap-x-1 ml-auto">
          {category.parentCategoryId !== null ? (
            isEditing ? (
              <button
                className="opacity-50"
                onClick={() => {
                  if (editingText === '' || editingText === category.name) {
                    setIsEditing(false);
                    return;
                  }
                  const formData = new FormData();
                  formData.append('categoryId', category.id as string);
                  formData.append('newCategoryName', editingText);
                  editCategoryFetcher.submit(formData, {
                    method: 'post',
                    action: EDIT_CATEGORY_NAME,
                  });
                  setIsEditing(false);
                }}>
                <i className="ri-send-plane-2-fill text-md" />
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="opacity-50">
                <i className="ri-pencil-fill text-lg" />
              </button>
            )
          ) : (
            <button
              onClick={() => setIsChildrenOpen(false)}
              className="opacity-50">
              <i className="ri-folder-reduce-line text-md" />
            </button>
          )}
          <button
            onClick={() => {
              setIsChildrenOpen(true);
              setIsAddingCategory(true);
            }}
            className="opacity-50">
            <i className="ri-add-line text-lg" />
          </button>
          {category.parentCategoryId !== null && (
            <button
              onClick={() => setIsDeleteConfirmationDialogOpen(true)}
              className="">
              <i className="ri-delete-bin-line" />
            </button>
          )}
        </div>
        {isDeleteConfirmationDialogOpen && (
          <Modal isOpen={isDeleteConfirmationDialogOpen}>
            <DeleteConfirmationDialog
              category={category.name}
              userId={user?.id as string}
              categoryId={category.id}
              onClose={() => setIsDeleteConfirmationDialogOpen(false)}
            />
          </Modal>
        )}
      </div>
      {isAddingCategory && (
        <div className="flex gap-x-1 items-center mt-1 ml-12 opacity-50">
          <i className="ri-folder-fill text-bright-blue text-xl" />
          <input
            onBlur={() => {
              setIsAddingCategory(false);
              if (newCategoryName.trim() === '') {
                setNewCategoryName('');
                return;
              }
              const formData = new FormData();
              formData.append('userId', user?.id as string);
              formData.append('newCategoryName', newCategoryName);
              formData.append('parentCategoryId', category.id);
              addCategoryFetcher.submit(formData, {
                method: 'post',
                action: ADD_CATEGORY,
              });
              setNewCategoryName('');
              setIsChildrenOpen(true);
            }}
            autoFocus
            value={newCategoryName}
            name="newCategoryName"
            onChange={(e) => setNewCategoryName(e.target.value)}
            type="text"
            className="border-b h-4 w-32 px-2 text-md"
          />
        </div>
      )}
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
