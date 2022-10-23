import { AnyAction, combineReducers, configureStore } from '@reduxjs/toolkit'
import { createWrapper, HYDRATE } from 'next-redux-wrapper'
import counterReducer, { CounterState } from './counter'

export interface ReducerStates {
  counter: CounterState
}

const rootReducer = (state: ReducerStates, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload }

    default:
      const combineReducer = combineReducers({
        counter: counterReducer
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

export type AppStore = ReturnType<typeof makeStore> // store 타입
export type RootState = ReturnType<typeof rootReducer>

const wrapper = createWrapper(makeStore, { debug: true })

export default wrapper
