import axios from "axios";
import { getUserDetails } from "./saveDetails";
const baseUrl = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL: baseUrl,
});

api.interceptors.request.use(
  (config) => {
    const token = getUserDetails("Ustoken")||getUserDetails("Adtoken");
    if (!(token === null)) {
      console.log("token is not null");
      console.log("Authenticated");
      config.headers["Authorization"] = "Bearer " + token;
      console.log(config);
    }
    setTimeout(() => {
      sessionStorage.clear();
    }, 30 * 60000);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (config) => config,
  (error) => {
    console.error("Error in request interceptor:", error);
    console.log(error.response);

    // if (error.response.status) {
    //   window.location.href = "/";
    // }

    return Promise.reject(error);
  },
);

export default api;
