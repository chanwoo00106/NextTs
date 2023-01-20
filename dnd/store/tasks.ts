import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TaskType {
  id: number;
  title: string;
  category: "Todo" | "Done";
}

export interface InitialStateType {
  tasks: TaskType[];
  Todo: number[];
  Done: number[];
}

const initialState: InitialStateType = {
  tasks: [
    { id: 0, title: "hello world", category: "Todo" },
    { id: 1, title: "hello chan", category: "Todo" },
    { id: 2, title: "hello woo", category: "Todo" },
    { id: 3, title: "hello spring", category: "Todo" },
    { id: 4, title: "안녕", category: "Done" },
    { id: 5, title: "this is test", category: "Done" },
    { id: 6, title: "hahaha", category: "Done" },
    { id: 7, title: "react-dnd is fun", category: "Done" },
  ],
  Todo: [0, 1, 2, 3],
  Done: [7, 4, 6, 5],
};

const tasks = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<TaskType>) => {
      state.tasks.push(action.payload);
      state.Todo.unshift(action.payload.id);
    },
    move: (
      state,
      {
        payload,
      }: PayloadAction<{
        id: number;
        targetCategory: "Todo" | "Done";
        targetId: number;
      }>
    ) => {
      const reverseCategory =
        payload.targetCategory === "Todo" ? "Done" : "Todo";

      const index = state.tasks.findIndex((i) => i.id === payload.id);
      state.tasks[index].category = payload.targetCategory;

      state[reverseCategory] = state[reverseCategory].filter(
        (i) => payload.id !== i
      );
      state[payload.targetCategory].splice(payload.targetId, 0, payload.id);
    },
    remove: (state, { payload: { id } }: PayloadAction<{ id: number }>) => {
      const index = state.tasks.findIndex((i) => i.id === id);
      const category = state.tasks[index].category;

      state[category] = state[category].filter((i) => i !== id);

      state.tasks = state.tasks.filter((i) => i.id !== id);
    },
  },
});

export const { add, remove, move } = tasks.actions;

export default tasks;
