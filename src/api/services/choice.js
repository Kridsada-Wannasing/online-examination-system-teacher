import { apiClient } from "../axios";

const endpoint = "choice";

export default {
  createChoices(choices) {
    return apiClient.post(`/${endpoint}`, choices);
  },
  getAllChoices(questionId) {
    return apiClient.get(`/${endpoint}/${questionId}`);
  },
  updateChoices(choices) {
    return apiClient.patch(`/${endpoint}/`, choices);
  },
  deleteChoices(choices) {
    return apiClient.delete(`${endpoint}/`, choices);
  },
};
