import Axios from "axios";

export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_FAILURE = "USER_LOGIN_FAILURE";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";

const loginUserRequest = () => ({
  type: USER_LOGIN_REQUEST,
  loading: true
});

const loginUserFailure = error => ({
  type: USER_LOGIN_FAILURE,
  error: error,
  loading: false
});

const loginUserSuccess = user => ({
  type: USER_LOGIN_SUCCESS,
  data: user,
  loading: false
});

export const loginUser = (username, password) => {
  return dispatch => {
    dispatch(loginUserRequest());
    Axios.put("http://localhost:5000/auth/login", {
      user_name: username,
      password: password
    })
      .then(res => {
        // the post request currently returns "return {"access_token": access_token}, 200"
        dispatch(loginUserSuccess(username));
      })
      .catch(err => {
        dispatch(loginUserFailure(err));
      });
  };
};
