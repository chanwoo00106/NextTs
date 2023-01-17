import { configureStore } from "@reduxjs/toolkit";
import tasks from "./tasks";

const store = configureStore({
  reducer: {
    tasks: tasks.reducer,
  },
});

export default store;
