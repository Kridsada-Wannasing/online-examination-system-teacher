import { apiClient } from "../axios";

const endpoint = "exam";

export default {
  createExam(exam) {
    return apiClient.post(`/${endpoint}/login`, exam);
  },
  getAllExams(subjectId, queryString) {
    return apiClient.get(`/${endpoint}/:${subjectId}`);
  },
  getExam(subjectId, examId) {
    return apiClient.get(`/${endpoint}/:${subjectId}/:${examId}`);
  },
  updateExam(subjectId, exam) {
    return apiClient.patch(`/${endpoint}/:${subjectId}/:${exam.examId}`, exam);
  },
  deleteExam(subjectId, examId) {
    return apiClient.delete(`${endpoint}/:${subjectId}/:${examId}`, data);
  },
};
