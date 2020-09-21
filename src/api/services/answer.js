import { apiClient } from "../axios";

const endpoint = "answer";

export default {
  createAnswer(answer) {
    return apiClient.post(`/${endpoint}`, answer);
  },
  getAllAnswers(questionId) {
    return apiClient.get(`/${endpoint}/${questionId}`);
  },
  updateAnswer(answer) {
    return apiClient.patch(`/${endpoint}`, answer);
  },
  deleteAnswer(answerId) {
    return apiClient.delete(`${endpoint}`, answerId);
  },
};
