import { AddIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Heading,
  IconButton,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import useColumnDrop from "../hooks/useColumnDrop";
import useColumnTask from "../hooks/useColumnTask";
import { ColumnType } from "../utils/enums";
import Task from "./Task";

interface Props {
  column: ColumnType;
}

const ColumnColorSchema: Record<ColumnType, string> = {
  Todo: "gray",
  Blocked: "red",
  Completed: "green",
  "In Progress": "blue",
};

const Column = ({ column }: Props) => {
  const { tasks, addEmptyTask, updateTask, deleteTask, dropTaskFrom } =
    useColumnTask(column);
  const { isOver, dropRef } = useColumnDrop({
    column,
    handleDrop: dropTaskFrom,
  });

  return (
    <Box>
      <Heading fontSize="md" mb={4} letterSpacing="wide">
        <Badge
          px={2}
          py={1}
          rounded="lg"
          colorScheme={ColumnColorSchema[column]}
        >
          {column}
        </Badge>
      </Heading>
      <IconButton
        size="xs"
        w="full"
        color={useColorModeValue("gray.500", "gray.400")}
        bgColor={useColorModeValue("gray.100", "gray.700")}
        _hover={{ bgColor: useColorModeValue("gray.200", "gray.600") }}
        py={2}
        variant="solid"
        colorScheme="black"
        aria-label="add-task"
        icon={<AddIcon />}
        onClick={addEmptyTask}
      />
      <Stack
        ref={dropRef}
        direction={{ base: "row", md: "column" }}
        h={{ base: 300, md: 600 }}
        p={4}
        mt={2}
        spacing={4}
        bgColor={useColorModeValue("gray.50", "gray.900")}
        rounded="lg"
        boxShadow="md"
        overflow="auto"
        alignItems="start"
        opacity={isOver ? 0.85 : 1}
      >
        {tasks.map((task, i) => (
          <Task
            key={i}
            task={task}
            index={i}
            onDelete={deleteTask}
            onUpdate={updateTask}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default Column;
