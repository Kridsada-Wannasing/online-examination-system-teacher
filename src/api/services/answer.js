import { apiClient } from "../axios";

const endpoint = "answer";

export default {
  createAnswers(answer) {
    return apiClient.post(`/${endpoint}`, answer);
  },
  getAllAnswers() {
    return apiClient.get(`/${endpoint}`);
  },
  getAnswersInQuestion(questionId) {
    return apiClient.get(`/${endpoint}/${questionId}`);
  },
  updateAnswer(answer) {
    return apiClient.patch(`/${endpoint}`, answer);
  },
  deleteAnswer(answerId) {
    return apiClient.delete(`${endpoint}`, answerId);
  }
};
