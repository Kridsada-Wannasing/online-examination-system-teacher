import { apiClient } from "../axios";

const endpoint = "question";

export default {
  createQuestion(question) {
    return apiClient.post(`/${endpoint}`, question);
  },
  getAllQuestions() {
    return apiClient.get(`/${endpoint}`);
  },
  getQuestionsInExam(examId) {
    return apiClient.get(`/question-exam/${examId}`);
  },
  getQuestion(examId) {
    return apiClient.get(`/${endpoint}/${examId}`);
  },
  updateQuestion(updateQuestion) {
    return apiClient.patch(
      `/${endpoint}/${updateQuestion.questionId}`,
      updateQuestion
    );
  },
  deleteQuestion(questionId) {
    return apiClient.delete(`${endpoint}/${questionId}`);
  },
};
