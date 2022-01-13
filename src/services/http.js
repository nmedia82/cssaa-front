import axios from "axios";
import logger from "./logService";
import { getToken, getId } from "./cache";

axios.defaults.headers.common["Content-Type"] =
  "application/x-www-form-urlencoded; charset=UTF-8;application/json";
axios.defaults.headers.common["x-auth-token"] = getToken();
axios.defaults.headers.common["x-auth-userid"] = getId();

axios.interceptors.response.use(null, (error) => {
  // console.log("Error in request", error);
  const expectedErrors =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedErrors) {
    logger.log(error);
    alert("An unexpected error occurred!");
  }
  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
