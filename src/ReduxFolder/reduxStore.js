import { createStore, applyMiddleware, compose } from "redux";
import { primaryReducer } from "./reduxReducers";
import thunk from "redux-thunk";

let store = createStore(
  primaryReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
