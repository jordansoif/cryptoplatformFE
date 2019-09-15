import cookie from "react-cookies";
import Axios from "axios";

const getAuthHeader = () => {
  const token = cookie.load("token");
  return { Authorization: `Bearer ${token}` };
};

export const getUser = () => {
  const header = getAuthHeader();
  Axios({
    method: "get",
    url: "http://localhost:5000/user",
    headers: getAuthHeader()
  }).then(console.log);
};
