import { Box, IconButton } from "@chakra-ui/react";
import { TaskModel } from "../utils/models";
import { DeleteIcon } from "@chakra-ui/icons";
import { ChangeEvent } from "react";
import { AutoResizeTextarea } from "./AutoResizeTextArea";

interface Props {
  index: number;
  task: TaskModel;
  onUpdate: (id: TaskModel["id"], updateTask: TaskModel) => void;
  onDelete: (id: TaskModel["id"]) => void;
}

const Task = ({ index, task, onDelete, onUpdate }: Props) => {
  const handleTitleChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    onUpdate(task.id, { ...task, title: e.target.value });

  const handleDeleteClick = () => onDelete(task.id);

  return (
    <Box
      as="div"
      role="group"
      position="relative"
      rounded="lg"
      w={200}
      pl={3}
      pr={7}
      pt={3}
      pb={1}
      boxShadow="xl"
      cursor="grab"
      backgroundColor={task.color}
    >
      <IconButton
        position="absolute"
        top={0}
        right={0}
        zIndex={100}
        aria-label="delete-task"
        size="md"
        color="gray.700"
        icon={<DeleteIcon />}
        opacity={0}
        _groupHover={{
          opacity: 1,
        }}
        onClick={handleDeleteClick}
      />
      <AutoResizeTextarea
        value={task.title}
        fontWeight="semibold"
        cursor="inherit"
        border="none"
        p={0}
        resize="none"
        minH={70}
        maxH={200}
        focusBorderColor="none"
        color="gray.700"
        onChange={handleTitleChange}
      />
    </Box>
  );
};

export default Task;
