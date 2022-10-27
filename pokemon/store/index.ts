import { configureStore } from '@reduxjs/toolkit'
import { createWrapper, HYDRATE } from 'next-redux-wrapper'
import { AnyAction, combineReducers } from 'redux'
import pokemonReducer, { PokemonState } from './pokemon'
import windowReducer, { WindowState } from './window'

export interface RootStates {
  pokemon: PokemonState
  window: WindowState
}

const rootReducer = (state: RootStates, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload }

    default:
      const combineReducer = combineReducers({
        pokemon: pokemonReducer,
        window: windowReducer
      })

      return combineReducer(state, action)
  }
}

const makeStore = () => {
  const store = configureStore({
    reducer: rootReducer as any,
    devTools: true
  })
  return store
}

const wrapper = createWrapper(makeStore, { debug: true })

export default wrapper
