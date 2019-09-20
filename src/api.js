import cookie from "react-cookies";
import Axios from "axios";

const BASE_URL = "http://localhost:5000/";

const authHead = () => {
  const token = cookie.load("token");
  return { Authorization: `Bearer ${token}` };
};

export const apiRequest  = async (method, url, payload) => {
  const header = authHead();
  if (method == "get") {
    const res = await Axios({
      method: `${method}`,
      url: `${BASE_URL}${url}`,
      headers: header
    });
    return res;
  } else if (method == "post" || method == "put") {
    const res = await Axios({
      method: `${method}`,
      url: `${BASE_URL}${url}`,
      data: payload,
      headers: header
    });
    return res;
  } else return;
};
