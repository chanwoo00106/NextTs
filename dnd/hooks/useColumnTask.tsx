import { useCallback, useEffect } from "react";
import { TaskModel } from "../utils/models";
import useTaskCollection from "./useTaskCollection";
import { v4 as uuidv4 } from "uuid";
import { ColumnType } from "../utils/enums";
import { pickChakraRandomColor } from "../utils/helpers";
import produce from "immer";

const MAX_TASK_PER_COLUMN = 100;

const useColumnTask = (column: ColumnType) => {
  const [tasks, setTasks] = useTaskCollection();

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  const addEmptyTask = useCallback(() => {
    setTasks(
      produce(tasks, (draft) => {
        const columnTasks = draft[column];

        if (columnTasks.length > MAX_TASK_PER_COLUMN) {
          console.log("Too many task");
          return draft;
        }

        const newColumnTask: TaskModel = {
          id: uuidv4(),
          title: `New ${column} task`,
          color: pickChakraRandomColor(".300"),
          column,
        };

        draft[column].push(newColumnTask);
      })
    );
  }, [column, setTasks, tasks]);

  const updateTask = useCallback(
    (id: TaskModel["id"], updatedTask: Omit<Partial<TaskModel>, "id">) => {
      console.log(`Updating task ${id} with ${JSON.stringify(updatedTask)}`);

      setTasks((allTasks) => {
        const columnTasks = allTasks[column];

        return {
          ...allTasks,
          [column]: columnTasks.map((task) =>
            task.id === id ? { ...task, ...updatedTask } : task
          ),
        };
      });
    },
    [column, setTasks]
  );

  const deleteTask = useCallback(
    (id: TaskModel["id"]) => {
      console.log(`Removing task ${id}..`);

      setTasks((allTasks) => {
        const columnTasks = allTasks[column];
        return {
          ...allTasks,
          [column]: columnTasks.filter((task) => task.id !== id),
        };
      });
    },
    [column, setTasks]
  );

  const dropTaskFrom = useCallback(
    (from: ColumnType, id: TaskModel["id"]) => {
      setTasks(
        produce(tasks, (draft) => {
          const fromColumnTasks = draft[from];
          const movingTask = fromColumnTasks.find((task) => task.id === id);

          console.log(fromColumnTasks[0]);
          console.log(fromColumnTasks[1]);

          if (movingTask === undefined) return;

          draft[from] = draft[from].filter((task) => task.id !== id);
          draft[column].push({ ...movingTask, column });
        })
      );
    },
    [column, setTasks, tasks]
  );

  return {
    tasks: tasks[column],
    addEmptyTask,
    updateTask,
    deleteTask,
    dropTaskFrom,
  };
};

export default useColumnTask;
