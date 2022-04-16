import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import cookie from "./cookie";

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case HYDRATE:
      console.log("HYDRATE", action);
      return action.payload;
    default: {
      const combineReducer = combineReducers({
        cookie,
      });
      return combineReducer(state, action);
    }
  }
};

const configureSotre = () => {
  const enhancer = composeWithDevTools(applyMiddleware());
  const store = createStore(reducer, enhancer);
  return store;
};

const wrapper = createWrapper(configureSotre);

export default wrapper;

export type RootState = ReturnType<typeof reducer>;
