import { createStore, applyMiddleware } from "redux";
import { primaryReducer } from "./reduxReducers";
import thunk from "redux-thunk";

let store = createStore(
  primaryReducer,
  applyMiddleware(
    thunk
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
