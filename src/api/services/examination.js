import { apiClient } from "../axios";

const endpoint = "examination";

export default {
  createExamination(examination) {
    return apiClient.post(`/${endpoint}`, examination);
  },
  getAllExaminations() {
    return apiClient.get(`/${endpoint}`);
  },
  getExamination(examinationId) {
    return apiClient.get(`/${endpoint}/${examinationId}`);
  },
  updateExamination(examination) {
    return apiClient.patch(
      `/${endpoint}/${examination.examinationId}`,
      examination
    );
  },
  deleteExamination(examinationId) {
    return apiClient.delete(`${endpoint}/${examinationId}`);
  },
};
