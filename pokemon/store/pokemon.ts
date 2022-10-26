import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Result } from '@types'

export interface PokemonState {
  pokemon: Result[]
}

const initialState: PokemonState = {
  pokemon: []
} as PokemonState

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    addPokemon: (state, action: PayloadAction<Result[]>) => {
      state.pokemon.push(...action.payload)
    }
  }
})

export const { addPokemon } = pokemonSlice.actions

export default pokemonSlice.reducer
