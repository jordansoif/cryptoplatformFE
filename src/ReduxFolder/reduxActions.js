import Axios from "axios";
import cookie from "react-cookies";

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
  console.log("inside loginUser");
  return () => {
    //was dispatch
    console.log("inside loginUser 2");
  };
  // dispatch(loginUserRequest());
  // Axios.post("http://localhost:5000/auth/login", {
  //   user_name: username,
  //   password: password
  // })
  //   .then(res => {
  //     // cookie.save("token", res.data.access_token);
  //     // this.props.history.push("/homepage");
  //     dispatch(loginUserSuccess(username));
  //   })
  //   .catch(err => {
  //     dispatch(loginUserFailure(err));
  //   });
  // };
};
