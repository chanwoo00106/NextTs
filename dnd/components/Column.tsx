import { Box, Heading } from "@chakra-ui/react";
import { RootState } from "@store";
import { useSelector } from "react-redux";
import Task from "./Task";

interface Props {
  type: "Todo" | "Done";
}
const Column = ({ type }: Props) => {
  const { tasks, list } = useSelector((state: RootState) => ({
    tasks: state.tasks.tasks,
    list: state.tasks[type],
  }));

  return (
    <>
      <Heading>{type}</Heading>
      <Box maxW="20rem">
        {list.map((i, index) => {
          const task = tasks.find((j) => j.id === i);
          if (!task) return;

          return <Task key={i} task={task} index={index} />;
        })}
      </Box>
    </>
  );
};

export default Column;
