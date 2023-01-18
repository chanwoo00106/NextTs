import { configureStore } from "@reduxjs/toolkit";
import doneSort from "./doneSort";
import tasks from "./tasks";
import todoSort from "./todoSort";

const store = configureStore({
  reducer: {
    tasks: tasks.reducer,
    donSort: doneSort.reducer,
    todoSort: todoSort.reducer,
  },
});

export default store;
