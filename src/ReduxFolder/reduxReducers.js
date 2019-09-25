import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAILURE,
  USER_LOGIN_SUCCESS,
  TRADE_PURCHASE_CONFIRM,
  TRADE_SALE_CONFIRM,
  TRADE_ERROR
} from "./reduxActions";
import { combineReducers } from "Redux";

const initialState = {
  currentUser: null,
  error: null,
  loading: null,
  loginError: null
};

export const primaryReducer = combineReducers({
  loginFeature,
  tradeConfirmation
});

// MAKE REDUCERS HANDLE THEIR OWN PORTION OF THE STORE, CURRENTLY SPLITTING A MATCHING STORE

export function loginFeature(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { ...state, loading: action.loading };
    case USER_LOGIN_FAILURE:
      return { ...state, loading: action.loading, error: action.error };
    case USER_LOGIN_SUCCESS:
      return { ...state, loading: action.loading, currentUser: action.data };
    default:
      return state;
  }
}

export function tradeConfirmation(state = initialState, action) {
  switch (action.type) {
    case TRADE_PURCHASE_CONFIRM:
      return {
        ...state,
        orderType: action.orderType,
        symbol: action.symbol,
        totalShares: action.totalShares,
        unitPrice: action.unitPrice
      };
    case TRADE_SALE_CONFIRM:
      return {
        ...state,
        orderType: action.orderType,
        symbol: action.symbol,
        totalShares: action.totalShares,
        unitPrice: action.unitPrice,
        tradeValue: action.tradeValue,
        saleLots: action.saleLots
      };
    case TRADE_ERROR:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
}
