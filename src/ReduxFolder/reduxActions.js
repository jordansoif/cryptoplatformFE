import Axios from "axios";
import cookie from "react-cookies";
import { apiRequest } from "../api";

export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_FAILURE = "USER_LOGIN_FAILURE";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const TRADE_PURCHASE_CONFIRM = "TRADE_PURCHASE_CONFIRM";
export const TRADE_SALE_CONFIRM = "TRADE_SALE_CONFIRM";

export const loginUserRequest = () => ({
  type: USER_LOGIN_REQUEST,
  loading: true
});

export const loginUserFailure = error => ({
  type: USER_LOGIN_FAILURE,
  error: error,
  loading: false
});

export const loginUserSuccess = user => ({
  type: USER_LOGIN_SUCCESS,
  data: user,
  loading: false
});

export const tradePurchase = (orderType, symbol, totalShares, unitPrice) => ({
  type: TRADE_PURCHASE_CONFIRM,
  orderType,
  symbol,
  totalShares,
  unitPrice
});

export const tradeSale = () => {};

export const loginUser = (username, password) => dispatch => {
  //was dispatch
  console.log("I ran loginUser 1");
  dispatch(loginUserRequest());
  apiRequest("POST", "/auth/login", {
    user_name: username,
    password: password
  })
    .then(res => {
      dispatch(loginUserSuccess(username));
      cookie.save("token", res.data.access_token);
    })
    .catch(err => {
      dispatch(loginUserFailure(err));
    });
};
