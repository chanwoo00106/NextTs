import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TaskType {
  id: number;
  title: string;
  category: "Todo" | "Done";
}

const initialState: TaskType[] = [
  { id: 0, title: "hello world", category: "Todo" },
  { id: 1, title: "hello chan", category: "Todo" },
  { id: 2, title: "hello woo", category: "Todo" },
  { id: 3, title: "hello spring", category: "Todo" },
  { id: 4, title: "안녕", category: "Todo" },
  { id: 5, title: "this is test", category: "Todo" },
  { id: 6, title: "hahaha", category: "Todo" },
  { id: 7, title: "react-dnd is fun", category: "Todo" },
];

const tasks = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<TaskType>) => {
      state.push(action.payload);
    },
    move: (
      state,
      { payload }: PayloadAction<{ id: number; category: "Todo" | "Done" }>
    ) => {
      const index = state.findIndex((i) => i.id === payload.id);
      state[index].category = payload.category;
    },
    remove: (state, action: PayloadAction<{ id: number }>) => {
      state = state.filter((i) => i.id !== action.payload.id);
    },
  },
});

export const { add, remove, move } = tasks.actions;

export default tasks;
