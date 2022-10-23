import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Result } from '@types'
import { HYDRATE } from 'next-redux-wrapper'

const initialState: Result[] = []

export const pokemon = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    addPokemon: (state, action: PayloadAction<Result[]>) => {
      state.push(...action.payload)
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log(action)
      state.push(action.payload.profile.pokemon)
    }
  }
})

export const { addPokemon } = pokemon.actions

export default pokemon.reducer
