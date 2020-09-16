import { apiClient } from "../axios";

export default {
  login(credentials) {
    return apiClient.post(`${endpoint}/login`, credentials);
  },
  forgotPassword(email) {
    return apiClient.post(`${endpoint}/forgotPassword`, email);
  },
  updateMe(data) {
    return apiClient.patch(`${endpoint}/me`, data);
  },
  updatePassword(oldPassword, newPassword) {
    return apiClient.patch(`${endpoint}/newPassword`, {
      oldPassword,
      newPassword,
    });
  },
};
