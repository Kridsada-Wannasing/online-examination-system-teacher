import axios from "axios";
import NProgress from "nprogress";

export const apiClient = axios.create({
  baseURL: "http://localhost:8000/teacher",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  timeout: 10000
});

apiClient.interceptors.request.use(
  config => {
    if (
      config.url.includes("/login") ||
      config.url.includes("/forgot-password")
    )
      return config;

    const token = localStorage.getItem("token_teacher");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    if (config.data instanceof FormData) {
      config.headers.post["Content-Type"] = "multipart/form-data";
    }

    NProgress.start();
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

apiClient.interceptors.response.use(response => {
  NProgress.done();
  return response;
});
