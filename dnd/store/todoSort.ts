import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: number[] = [2, 3, 1, 0];

const todoSort = createSlice({
  name: "todoSort",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<{ id: number }>) => {
      state.unshift(action.payload.id);
    },
    move: (
      state,
      { payload }: PayloadAction<{ id: number; targetPos: number }>
    ) => {
      state.splice(payload.targetPos, 0, payload.id);
    },
    remove: (state, action: PayloadAction<{ id: number }>) => {
      state = state.filter((i) => i !== action.payload.id);
    },
  },
});

export const { add, move, remove } = todoSort.actions;

export default todoSort;
