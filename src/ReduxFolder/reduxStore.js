import { createStore } from "Redux";
import { primaryReducer } from "./reduxReducers";

let store = createStore(
  primaryReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
