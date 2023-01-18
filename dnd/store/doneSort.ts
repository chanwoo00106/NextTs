import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: number[] = [];

const doneSort = createSlice({
  name: "doneSort",
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

export const { add, move, remove } = doneSort.actions;

export default doneSort;
