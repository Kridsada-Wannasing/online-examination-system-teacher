import { apiClient } from "../axios";

const endpoint = "/student";

export default {
  registerStudents(newStudents) {
    return apiClient.post(`${endpoint}/register-many`, newStudents);
  },
  getAllStudents() {
    return apiClient.get(`${endpoint}`);
  },
};