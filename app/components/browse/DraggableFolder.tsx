import { useDrag, useDrop } from 'react-dnd';
import { CategoryWithChildren } from '~/types/word';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { useEffect } from 'react';
import { callMoveCategoryAction } from '~/modules/server/callMoveCategoryAction';
import { getMoveCategoryActionPath } from '~/modules/path/getMoveCategoryActionPath';
import { useLocation } from '@remix-run/react';

type Props = {
  category: CategoryWithChildren;
  setChosenCategoryId: React.Dispatch<React.SetStateAction<string>>;
};

export const DraggableFolder = ({ category, setChosenCategoryId }: Props) => {
  const location = useLocation();
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: 'folder',
    item: { id: category.id, name: category.name },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop({
    accept: 'folder',
    drop(item: { id: string }, monitor) {
      if (monitor.isOver()) {
        callMoveCategoryAction(
          item.id,
          category.id,
          getMoveCategoryActionPath(location.pathname, category.id)
        );
      }
    },
  });

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  return (
    <div ref={(node) => drag(drop(node))} className="flex gap-x-1">
      <i className="ri-folder-fill text-bright-blue text-xl" />
      <button onClick={() => setChosenCategoryId(category.id)}>
        {category.name}
      </button>
    </div>
  );
};
