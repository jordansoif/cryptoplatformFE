import cookie from "react-cookies";
import Axios from "axios";

const authHead = () => {
  const token = cookie.load("token");
  return { Authorization: `Bearer ${token}` };
};

export const autoHeader = async (method, url, payload) => {
  const header = authHead();
  if (method == "get") {
    const res = await Axios({
      method: `${method}`,
      url: `http://localhost:5000/${url}`,
      headers: header
    });
    return res;
  } else if (method == "post" || method == "put") {
    const res = await Axios({
      method: `${method}`,
      url: `http://localhost:5000/${url}`,
      data: payload,
      headers: header
    });
    return res;
  } else return;
};
