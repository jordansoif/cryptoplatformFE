import { createStore } from "Redux";
import { loginFeature } from "./reduxReducers";

let store = createStore(
  loginFeature,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
