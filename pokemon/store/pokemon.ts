import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Result } from '@types'
import { HYDRATE } from 'next-redux-wrapper'

export interface PokemonState {
  pokemon: Result[]
}

const initialState: PokemonState = {
  pokemon: []
} as PokemonState

export const pokemonSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addPokemon: (state, action: PayloadAction<Result[]>) => {
      state.pokemon.push(...action.payload)
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      state.pokemon = action.payload.profile.pokemon
    }
  }
})

export const { addPokemon } = pokemonSlice.actions

export default pokemonSlice.reducer
