import { createStore } from "Redux";

const initialState = {
  currentUser: null
};

function loginFeature(state = initialState, action) {
  switch (action.type) {
    case "LOGIN":
      return Object.assign({}, state, {
        currentUser: action.currentUser
      });
    case "LOGOUT":
      return Object.assign({}, state, {
        currentUser: ""
      });
    default:
      return;
  }
}

let store = createStore(
  loginFeature,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
