import { createWrapper, HYDRATE } from 'next-redux-wrapper'
import { AnyAction, combineReducers, configureStore } from '@reduxjs/toolkit'
import pokemon from './pokemon'
import { Result } from '@types'

export interface ReducerState {
  pokemon: Result[]
}

const rootReducer = (state: ReducerState, action: AnyAction) => {
  console.log(state, action)
  switch (action.type) {
    case HYDRATE:
      console.log('hi')
      return { ...state, ...action.payload }

    default:
      const combineReducer = combineReducers({ pokemon })
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

export type AppStore = ReturnType<typeof makeStore>
export type RootStore = ReturnType<typeof rootReducer>

const wrapper = createWrapper(makeStore, { debug: true })

export default wrapper
