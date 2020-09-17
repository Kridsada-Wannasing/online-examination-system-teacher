import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:8000/api/v1/teacher",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (config) => {
    if (
      config.url.includes("/login") ||
      config.url.includes("/forgot-password")
    )
      return config;

    const token = localStorage.getItem("token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
