import { useDrag, useDrop } from "react-dnd";
import { CategoryWithChildren } from "~/types/word";
import { getEmptyImage } from "react-dnd-html5-backend";
import { useEffect, useState } from "react";
import { MoveCategoryConfirmationDialog } from "./MoveCategoryConfirmationDialog";
import { Modal } from "../modal/Modal";
import { Link } from "@remix-run/react";
import { getWordCategoryPath } from "~/modules/path/getWordCategoryPath";
import { useRecoilState } from "recoil";
import { userAtom } from "~/atoms/atom";

type Props = {
  category: CategoryWithChildren;
  setChosenCategoryId: React.Dispatch<React.SetStateAction<string>>;
};

export const DraggableFolder = ({ category, setChosenCategoryId }: Props) => {
  const [user] = useRecoilState(userAtom);

  const [
    isMoveCategoryConfirmationDialogOpen,
    setIsMoveCategoryConfirmationDialogOpen,
  ] = useState<boolean>(false);
  const [currentCategoryId, setCurrentCategoryId] = useState<string>("");
  const [currentCategoryName, setCurrentCategoryName] = useState<string>("");
  const [targetCategoryId, setTargetCategoryId] = useState<string>("");
  const [targetCategoryName, setTargetCategoryName] = useState<string>("");
  const [, drag, preview] = useDrag(() => ({
    type: "folder",
    item: {
      id: category.id,
      name: category.name,
      parentCategoryId: category.parentCategoryId,
    },
    canDrag: () =>
      !isMoveCategoryConfirmationDialogOpen &&
      category.parentCategoryId !== null,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop({
    accept: "folder",
    drop(item: Partial<CategoryWithChildren>, monitor) {
      if (monitor.isOver()) {
        if (item.id === category.id || item.parentCategoryId === category.id)
          return;

        setCurrentCategoryId(() => item.id as string);
        setCurrentCategoryName(() => item.name as string);
        setTargetCategoryId(() => category.id);
        setTargetCategoryName(() => category.name);
        setIsMoveCategoryConfirmationDialogOpen(true);
      }
    },
  });

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  return (
    <div ref={(node) => drag(drop(node))} className="w-full">
      <Link
        to={getWordCategoryPath(user?.id as string, category.name, category.id)}
        className="flex gap-x-1 w-full"
        onClick={(e) => {
          if (category.parentCategoryId === null) {
            e.preventDefault();
            return;
          } else {
            setChosenCategoryId(category.id);
          }
        }}
      >
        <i className="ri-folder-fill text-bright-blue text-xl" />
        <span>{category.name}</span>
      </Link>
      {isMoveCategoryConfirmationDialogOpen && (
        <Modal isOpen={isMoveCategoryConfirmationDialogOpen}>
          <MoveCategoryConfirmationDialog
            currentCategoryId={currentCategoryId}
            currentCategoryName={currentCategoryName}
            targetCategoryId={targetCategoryId}
            targetCategoryName={targetCategoryName}
            onClose={() => setIsMoveCategoryConfirmationDialogOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
};
