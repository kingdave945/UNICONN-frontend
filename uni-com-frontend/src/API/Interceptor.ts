import axios from "axios";
import type { InternalAxiosRequestConfig, AxiosError, AxiosResponse } from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL: baseUrl,
});

// REQUEST INTERCEPTOR
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get token from sessionStorage (saved under "user")
    const rawUser = sessionStorage.getItem("user");
    const userData = rawUser ? JSON.parse(rawUser) : null;
    const token = userData?.token;
     
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
      console.log("🔑 Attached token to request:", token);
    } else {
      console.log("⚠️ No token found in sessionStorage");
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.log("⚠️ Token expired/invalid. Clearing session.");
      sessionStorage.clear();
      // optional: redirect to login page
    }
    return Promise.reject(error);
  }
);

export default api;
