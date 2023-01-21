import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import TasksActions from "./util/TasksActions";

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

export interface MovePayloadType {
  id: number;
  targetCategory: "Todo" | "Done";
  targetId: number;
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
      const tasksActions = new TasksActions(state);
      tasksActions.add(action.payload);
    },

    move: (state, { payload }: PayloadAction<MovePayloadType>) => {
      const tasksActions = new TasksActions(state);
      tasksActions.move(payload);
    },

    remove: (state, { payload: { id } }: PayloadAction<{ id: number }>) => {
      const tasksActions = new TasksActions(state);
      tasksActions.remove(id);
    },
  },
});

export const { add, remove, move } = tasks.actions;

export default tasks;
