import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Result } from '@types'

export interface PokemonState {
  pokemon: Result[]
  offset: number | null
  isLoading: boolean
}

const initialState: PokemonState = {
  pokemon: [],
  offset: 0,
  isLoading: false
} as PokemonState

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    addPokemon: (state, action: PayloadAction<Result[]>) => {
      if (state.offset === null) return
      state.pokemon.push(...action.payload)
      state.offset += 1
    },
    setIsLoading: state => {
      state.isLoading = !state.isLoading
    }
  }
})

export const { addPokemon, setIsLoading } = pokemonSlice.actions

export default pokemonSlice.reducer
