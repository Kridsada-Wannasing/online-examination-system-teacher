import { apiClient } from "../axios";

const endpoint = "tag";

export default {
  createTag(tag) {
    return apiClient.post(`/${endpoint}`, tag);
  },
  getAllTags() {
    return apiClient.get(`/${endpoint}`);
  },
  getTagsInQuestion(questionId) {
    return apiClient.get(`/question-tag/${questionId}`);
  },
  updateTag(tag) {
    return apiClient.patch(`/${endpoint}/:${tag.tagId}`, tag);
  },
  deleteTag(tagId) {
    return apiClient.delete(`/${endpoint}/:${tagId}`);
  },
};
