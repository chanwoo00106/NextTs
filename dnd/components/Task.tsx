import { Card, CardBody, Text, CardHeader, Heading } from "@chakra-ui/react";
import { TaskType } from "@store/tasks";
import { useDrag, useDrop } from "react-dnd";

interface Props {
  task: TaskType;
}

const Task = ({ task }: Props) => {
  const [{ isDragging }, drag] = useDrag({
    type: "Task",
    item: task,
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

  const [, drop] = useDrop<TaskType>({
    accept: "Task",
    drop: (item) => {
      if (item.id === task.id) return;
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
