const initialState = {
  currentUser: null
};

export const loginFeature = (state = initialState, action) => {
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
};
