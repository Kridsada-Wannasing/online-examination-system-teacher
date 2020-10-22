import { apiClient } from "../axios";

const endpoint = "score";

export default {
  createScore(score) {
    return apiClient.post(`/${endpoint}`, score);
  },
  getAllScores(subjectId, queryString) {
    if (queryString)
      return apiClient.get(`/${endpoint}/${subjectId}${queryString}`);
    else return apiClient.get(`/${endpoint}/${subjectId}`);
  },
  getScore(subjectId, scoreId) {
    return apiClient.get(`/${endpoint}/${subjectId}/${scoreId}`);
  },
  updateScore(examLogId, score) {
    return apiClient.patch(`/${endpoint}/${examLogId}/${score.scoreId}`, score);
  },
  deleteScore(subjectId, scoreId) {
    return apiClient.delete(`${endpoint}/${subjectId}/${scoreId}`);
  },
};
