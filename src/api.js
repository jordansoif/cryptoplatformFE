import cookie from "react-cookies";
import Axios from "axios";

export const getAuthHeader = () => {
  const token = cookie.load("token");
  return { Authorization: `Bearer ${token}` };
};
