import { apiClient } from "../axios";

const endpoint = "image";

export default {
  getImageInQuestion(questionId) {
    return apiClient.get(`/${endpoint}/${questionId}`);
  },
  getAllImages() {
    return apiClient.get(`/${endpoint}`);
  },
  uploadImage(image) {
    return apiClient.post(`/${endpoint}`, image);
  },
  changeImage(image) {
    return apiClient.patch(`/${endpoint}/${image.questionId}`, image);
  },
  deleteImage(questionId) {
    return apiClient.delete(`${endpoint}/${questionId}`);
  },
};
