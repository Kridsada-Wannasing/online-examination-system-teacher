import { apiClient } from "../axios";

const endpoint = "exam";

export default {
  createQuestion(question) {
    return apiClient.post(`/${endpoint}/login`, question);
  },
  getAllQuestions(examId, queryString) {
    return apiClient.get(`/${endpoint}/:${examId}?${queryString}`);
  },
  getQuestion(questionId) {
    return apiClient.get(`/${endpoint}/:${questionId}`);
  },
  updateQuestion(question) {
    return apiClient.patch(`/${endpoint}/:${question.questionId}`, question);
  },
  deleteQuestion(questionId) {
    return apiClient.delete(`${endpoint}/:${questionId}/:${examId}`);
  },
};
