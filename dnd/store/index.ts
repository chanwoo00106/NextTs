import { configureStore } from "@reduxjs/toolkit";
import tasks, { InitialStateType } from "./tasks";

export interface RootState {
  tasks: InitialStateType;
}

const store = configureStore({
  reducer: {
    tasks: tasks.reducer,
  },
});

export default store;
