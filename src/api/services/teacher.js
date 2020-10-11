import { apiClient } from "../axios";

export default {
  login(credentials) {
    return apiClient.post("/login", credentials);
  },
  forgotPassword(email) {
    return apiClient.post("/forgot-password", email);
  },
  updateMe(data) {
    return apiClient.patch("/me", data);
  },
  updatePassword(updatePassword) {
    return apiClient.patch("/password", updatePassword);
  }
};
