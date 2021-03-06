import cookie from "react-cookies";
import { apiRequest } from "../api";

export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_FAILURE = "USER_LOGIN_FAILURE";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const TRADE_PURCHASE_CONFIRM = "TRADE_PURCHASE_CONFIRM";
export const TRADE_SALE_CONFIRM = "TRADE_SALE_CONFIRM";
export const TRADE_ERROR = "TRADE_ERROR";

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

export const tradeBuy = (orderType, symbol, totalShares, unitPrice) => ({
  type: TRADE_PURCHASE_CONFIRM,
  orderType,
  symbol,
  totalShares,
  unitPrice
});

export const tradeSell = (
  orderType,
  symbol,
  totalShares,
  unitPrice,
  tradeValue,
  saleLots
) => ({
  type: TRADE_SALE_CONFIRM,
  orderType,
  symbol,
  totalShares,
  unitPrice,
  tradeValue,
  saleLots
});

export const tradeError = () => ({
  type: TRADE_ERROR,
  error: true
});

export const loginUser = (username, password) => dispatch => {
  dispatch(loginUserRequest());
  apiRequest("post", "auth/login", {
    user_name: username,
    password: password
  })
    .then(res => {
      cookie.save("token", res.data.access_token);
      dispatch(loginUserSuccess(username));
    })
    .catch(err => {
      dispatch(
        loginUserFailure(
          "Login request failed, username/password entered was not found."
        )
      );
    });
};

export const tradeTicketInfo = (
  orderType,
  symbol,
  totalShares,
  unitPrice,
  tradeValue,
  saleLots
) => dispatch => {
  apiRequest("put", `trade/${orderType.toLowerCase()}crypto`, {
    symbol: symbol,
    share_price: unitPrice,
    total_shares: totalShares,
    share_price: unitPrice,
    trade_value_calc: tradeValue,
    sale_lots: saleLots
  })
    .then(res => {
      if (orderType == "Buy") {
        dispatch(tradeBuy(orderType, symbol, totalShares, unitPrice));
      }
      if (orderType == "Sell") {
        dispatch(
          tradeSell(
            orderType,
            symbol,
            totalShares,
            unitPrice,
            tradeValue,
            saleLots
          )
        );
      }
      return res;
    })
    .catch(err => {
      return dispatch(tradeError());
    });
};
