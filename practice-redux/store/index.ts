import { AnyAction, combineReducers, configureStore } from '@reduxjs/toolkit'
import { createWrapper, HYDRATE } from 'next-redux-wrapper'
import counterReducer from './counter'

const rootReducer = combineReducers({
  counter: counterReducer
})

const reducer = (state: RootState | undefined, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload }

    default:
      return rootReducer(state, action)
  }
}

const makeStore = () => {
  const store = configureStore({
    reducer,
    devTools: true
  })
  return store
}

export type RootState = ReturnType<typeof rootReducer>

const wrapper = createWrapper(makeStore, { debug: true })

export default wrapper
