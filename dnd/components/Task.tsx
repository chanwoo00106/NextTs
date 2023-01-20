import { Card, CardBody, Text, CardHeader, Heading } from "@chakra-ui/react";
import { move } from "@store/tasks";
import { TaskType } from "@store/tasks";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";

interface Props {
  task: TaskType;
  index: number;
}

const Task = ({ task, index }: Props) => {
  const dispatch = useDispatch();
  const [, drag] = useDrag({
    type: "Task",
    item: task,
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

  const [, drop] = useDrop<TaskType>({
    accept: "Task",
    drop: (item) => {
      if (item.id === task.id) return;
      dispatch(
        move({ id: item.id, targetCategory: task.category, targetId: index })
      );
    },
  });

  return (
    <Card ref={(node) => drop(drag(node))} mb="5">
      <CardHeader>
        <Heading>{task.title}</Heading>
      </CardHeader>
      <CardBody>
        <Text>{task.title}</Text>
      </CardBody>
    </Card>
  );
};

export default Task;
