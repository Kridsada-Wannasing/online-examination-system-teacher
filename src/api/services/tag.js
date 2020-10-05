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
  addTagToQuestion(tag) {
    return apiClient.post(`/question-tag/${tag[0].questionId}`, tag);
  },
  updateTag(tag) {
    return apiClient.patch(`/${endpoint}/${tag.tagId}`, tag);
  },
  updateTagsInQuestion(tag) {
    return apiClient.patch(`/question-tag/${tag[0].questionId}`, tag);
  },
  deleteTag(tagId) {
    return apiClient.delete(`/${endpoint}/${tagId}`);
  },
};
