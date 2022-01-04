import axios from "axios";

axios.interceptors.request.use(
  function (request) {
    // request.headers.common["Content-Type"] = "text/plain";
    request.headers.common["Content-Type"] =
      "application/x-www-form-urlencoded; charset=UTF-8;application/json";
    // request.headers.common["Accept"] = "text/plain";
    // request.headers.common["Accept"] =
    //   "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8";
    // request.headers.common['Authorization'] = '***';
    return request;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(null, (error) => {
  console.log("Error in request", error);
  const expectedErrors =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedErrors) {
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
