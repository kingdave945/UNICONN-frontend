import axios from "axios";
import type { InternalAxiosRequestConfig, AxiosError, AxiosResponse } from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL: baseUrl,
});


api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {

    const rawUser = sessionStorage.getItem("user");
    const userData = rawUser ? JSON.parse(rawUser) : null;
    const token = userData?.data?.token;

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
    console.error("❌ Error in response interceptor:", error.response);

    // If unauthorized, you could auto-logout
    if (error.response?.status === 401) {
      console.log("⚠️ Token expired/invalid. Clearing session.");
      sessionStorage.clear();
      // optional: redirect to login page
    }

    return Promise.reject(error);
  }
);

export default api;
