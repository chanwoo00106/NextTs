import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface WindowState {
  scrollY: number
}

const initialState: WindowState = {
  scrollY: 0
} as WindowState

export const windowSlice = createSlice({
  name: 'window',
  initialState,
  reducers: {
    setScrollY: (state, action: PayloadAction<number>) => {
      state.scrollY = action.payload
    }
  }
})

export const { setScrollY } = windowSlice.actions

export default windowSlice.reducer
