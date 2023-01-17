import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TaskType {
  id: number;
  title: string;
  category: "Todo" | "Done";
}

interface MoveType {
  id: number;
  moveCategory: "Todo" | "Done";
}

const initialState: TaskType[] = [];

const tasks = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<TaskType>) => {
      state.push(action.payload);
    },
    move: (state, action: PayloadAction<MoveType>) => {
      return state.map((i) => {
        if (i.id === action.payload.id)
          return { ...i, category: action.payload.moveCategory };
        return i;
      });
    },
  },
});

export const { add, move } = tasks.actions;

export default tasks;
