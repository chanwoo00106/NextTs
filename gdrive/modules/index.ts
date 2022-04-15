import { createWrapper } from "next-redux-wrapper";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import cookie from "./cookie";

const reducer = combineReducers({ cookie });

const configureSotre = () => {
  const enhancer = composeWithDevTools(applyMiddleware());
  const store = createStore(reducer, enhancer);
  return store;
};

const wrapper = createWrapper(configureSotre);

export default wrapper;
