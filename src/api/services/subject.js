import { apiClient } from "../axios";

const endpoint = "subject";

export default {
  createSubject(subject) {
    return apiClient.post(`/${endpoint}`, subject);
  },
  getAllSubjects() {
    return apiClient.get(`/${endpoint}`);
  },
  getSubject(subjectId) {
    return apiClient.get(`/${endpoint}/${subjectId}`);
  },
  updateSubject(subject) {
    return apiClient.patch(`/${endpoint}/${subject.subjectId}`, subject);
  },
  deleteSubject(subjectId) {
    return apiClient.delete(`/${endpoint}/${subjectId}`);
  }
};
