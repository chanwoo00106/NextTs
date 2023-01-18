import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TaskType {
  id: number;
  title: string;
  category: "Todo" | "Done";
  sort: number;
}

const initialState: TaskType[] = [];

const tasks = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<TaskType>) => {
      state.push(action.payload);
    },
    remove: (state, action: PayloadAction<{ id: number }>) => {
      state = state.filter((i) => i.id !== action.payload.id);
    },
  },
});

export const { add, remove } = tasks.actions;

export default tasks;
