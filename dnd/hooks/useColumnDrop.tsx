import { useDrop } from "react-dnd";
import { ColumnType, ItemType } from "../utils/enums";
import { DragItem, TaskModel } from "../utils/models";

interface Props {
  column: ColumnType;
  handleDrop: (formColumn: ColumnType, taskId: TaskModel["id"]) => void;
}

const useColumnDrop = ({ column, handleDrop }: Props) => {
  const [{ isOver }, dropRef] = useDrop<DragItem, void, { isOver: boolean }>({
    accept: ItemType.TASK,
    drop: (dragItem) => {
      if (!dragItem || dragItem.form === column) return;

      handleDrop(dragItem.form, dragItem.id);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return { isOver, dropRef };
};

export default useColumnDrop;
