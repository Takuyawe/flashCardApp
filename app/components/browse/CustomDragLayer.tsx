import { useDragLayer } from 'react-dnd';

function CustomDragLayer() {
  const { isDragging, item, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  if (!isDragging) {
    return null;
  }

  // ドラッグ中のアイテムのスタイルや位置を計算
  const transform = currentOffset
    ? `translate(${currentOffset.x}px, ${currentOffset.y}px)`
    : '';

  return (
    <div
      className="fixed pointer-events-none left-0 top-0 z-10"
      style={{ transform }}>
      {/* ドラッグ中に表示する要素のスタイルと内容をカスタマイズ */}
      <i className="ri-folder-fill text-bright-blue text-xl" />
      <span>{item.name}</span>
    </div>
  );
}

export default CustomDragLayer;
