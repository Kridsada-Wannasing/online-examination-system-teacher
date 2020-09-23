import { apiClient } from "../axios";

export default {
  registerStudents(newStudents) {
    return apiClient.post(`${endpoint}/register-many`, newStudents);
  },
};
