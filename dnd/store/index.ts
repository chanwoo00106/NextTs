import { configureStore } from "@reduxjs/toolkit";
import doneSort from "./doneSort";
import tasks, { TaskType } from "./tasks";
import todoSort from "./todoSort";

export interface RootState {
  tasks: TaskType[];
  doneSort: number[];
  todoSort: number[];
}

const store = configureStore({
  reducer: {
    tasks: tasks.reducer,
    doneSort: doneSort.reducer,
    todoSort: todoSort.reducer,
  },
});

export default store;
