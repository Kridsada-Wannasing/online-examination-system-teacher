import { apiClient } from "../axios";

const endpoint = "question";

export default {
  createQuestion(exam) {
    return apiClient.post(`/${endpoint}/login`, exam);
  },
  getAllQuestions(examId) {
    return apiClient.get(`/${endpoint}/${examId}`);
  },
  getQuestionsInExam(examId) {
    return apiClient.get(`/question-exam/${examId}`);
  },
  getQuestion(subjectId, examId) {
    return apiClient.get(`/${endpoint}/${subjectId}/${examId}`);
  },
  updateQuestion(questionId, updateQuestion) {
    return apiClient.patch(`/${endpoint}/${questionId}`, updateQuestion);
  },
  deleteQuestion(questionId) {
    return apiClient.delete(`${endpoint}/${questionId}`);
  },
};
