import { apiClient } from "../axios";

const endpoint = "score";

export default {
  createScore(score) {
    return apiClient.post(`/${endpoint}`, score);
  },
  getAllScores(subjectId, queryString) {
    return apiClient.get(`/${endpoint}/:${subjectId}${queryString}`);
  },
  getScore(subjectId, scoreId) {
    return apiClient.get(`/${endpoint}/:${subjectId}/:${scoreId}`);
  },
  updateScore(subjectId, score) {
    return apiClient.patch(
      `/${endpoint}/:${subjectId}/:${score.scoreId}`,
      score
    );
  },
  deleteScore(subjectId, scoreId) {
    return apiClient.delete(`${endpoint}/:${subjectId}/:${scoreId}`);
  },
};