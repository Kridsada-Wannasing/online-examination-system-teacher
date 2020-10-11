import { apiClient } from "../axios";

const endpoint = "exam";

export default {
  createExam(exam) {
    return apiClient.post(`/${endpoint}`, exam);
  },
  duplicateExam(examId) {
    return apiClient.post(`/${endpoint}/${examId}`);
  },
  getAllExams(subjectId, queryString) {
    if (queryString)
      return apiClient.get(`/${endpoint}/${subjectId}?${queryString}`);
    else return apiClient.get(`/${endpoint}/${subjectId}`);
  },
  getExam(subjectId, examId) {
    return apiClient.get(`/${endpoint}/${subjectId}/${examId}`);
  },
  updateExam(exam) {
    return apiClient.patch(`/${endpoint}/${exam.examId}`, exam);
  },
  deleteExam(examId) {
    return apiClient.delete(`${endpoint}/${examId}`);
  }
};
