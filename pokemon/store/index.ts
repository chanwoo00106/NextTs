import { createWrapper, HYDRATE } from 'next-redux-wrapper'
import { AnyAction, combineReducers, configureStore } from '@reduxjs/toolkit'
import pokemon from './pokemon'
import { Result } from '@types'

interface ReducerState {
  pokemon: Result[]
}

const rootReducer = (state: ReducerState, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload

    default: {
      const combineReducer = combineReducers({ pokemon })
      return combineReducer(state, action)
    }
  }
}

const makeStore = () => {
  const store = configureStore({
    reducer: rootReducer as any,
    devTools: process.env.NODE_ENV === 'development'
  })
  return store
}

export type AppStore = ReturnType<typeof makeStore>
export type RootStore = ReturnType<typeof rootReducer>
export type AppDispatch = AppStore['dispatch']

const wrapper = createWrapper(makeStore)

export default wrapper
