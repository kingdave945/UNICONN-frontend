import axios from "axios";
import type { InternalAxiosRequestConfig, AxiosError, AxiosResponse } from "axios";
import { getUserDetails } from "./saveDetails";

const baseUrl = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL: baseUrl,
});

// REQUEST INTERCEPTOR
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getUserDetails("Ustoken") || getUserDetails("Adtoken");

    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }

    // Auto-clear session after 30 minutes
    setTimeout(() => {
      sessionStorage.clear();
    }, 30 * 60000);

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    console.error("Error in request interceptor:", error);
    console.log(error.response);
    return Promise.reject(error);
  }
);

export default api;
