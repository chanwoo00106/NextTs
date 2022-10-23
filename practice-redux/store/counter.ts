import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '.'

interface CounterState {
  count: number
}

const initialState = {
  count: 0
} as CounterState

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increament: state => {
      state.count += 1
    },
    decreament: state => {
      state.count -= 1
    }
  }
})

export const { decreament, increament } = counterSlice.actions

export const selectCount = (state: RootState) => state.counter.count

export default counterSlice.reducer
