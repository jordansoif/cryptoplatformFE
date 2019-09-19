import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAILURE,
  USER_LOGIN_SUCCESS
} from "./reduxActions";

const initialState = {
  currentUser: null,
  loading: null,
  loginError: null
};

// export const loginFeature = (state = initialState, action) => {
// export default function (state = initialState, action) {

export const loginFeature = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { ...state, loading: action.loading };
    case USER_LOGIN_FAILURE:
      return { ...state, loading: action.loading, error: action.error };
    case USER_LOGIN_SUCCESS:
      return { ...state, loading: action.loading, currentUser: action.user };
    default:
      return state;
  }
};
