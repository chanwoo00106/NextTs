import myRoom from "./myRoom";
import { combineReducers } from "redux";
import { createStore } from "redux";
import { createWrapper } from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducers({
  myRoom,
});

export type RootState = ReturnType<typeof reducer>;

const configureStore = () => {
  const store = createStore(reducer, composeWithDevTools());
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === "development",
});

export default wrapper;
