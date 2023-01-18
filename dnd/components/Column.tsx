import { Box, Heading } from "@chakra-ui/react";
import { RootState } from "@store";
import { useSelector } from "react-redux";
import Task from "./Task";

interface Props {
  type: "todoSort" | "doneSort";
}

const Column = ({ type }: Props) => {
  const { tasks, list } = useSelector((state: RootState) => ({
    tasks: state.tasks,
    list: state[type],
  }));

  return (
    <>
      <Heading>{type}</Heading>
      <Box maxW="20rem">
        {list.map((i) => {
          const task = tasks.find((j) => j.id === i);
          if (!task) return;

          return <Task key={i} task={task} />;
        })}
      </Box>
    </>
  );
};

export default Column;
