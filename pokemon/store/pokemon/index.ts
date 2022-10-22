import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Result } from '@types'
import produce from 'immer'

const initialState: Result[] = []

export const pokemon = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    addPokemon: (state, action: PayloadAction<Result[]>) => {
      state = produce(state, draft => {
        draft.push(...action.payload)
      })
      console.log(state)
    }
  }
})

export const { addPokemon } = pokemon.actions

export default pokemon.reducer
