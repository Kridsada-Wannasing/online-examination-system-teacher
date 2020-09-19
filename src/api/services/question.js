import { apiClient } from "../axios";

const endpoint = "question";

export default {
  createQuestion(exam) {
    return apiClient.post(`/${endpoint}/login`, exam);
  },
  getAllQuestions(examId, queryString) {
    return apiClient.get(`/${endpoint}/${examId}`);
  },
  getQuestionsInExam(examId) {
    return apiClient.get(`/question-exam/${examId}`);
  },
  getQuestion(subjectId, examId) {
    return apiClient.get(`/${endpoint}/${subjectId}/${examId}`);
  },
  updateQuestion(subjectId, exam) {
    return apiClient.patch(`/${endpoint}/${subjectId}/${exam.examId}`, exam);
  },
  deleteQuestion(subjectId, examId) {
    return apiClient.delete(`${endpoint}/${subjectId}/${examId}`, data);
  },
};
