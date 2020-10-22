import { apiClient } from "../axios";

const endpoint = "examination";

export default {
  createExamination(examination) {
    return apiClient.post(`/${endpoint}`, examination);
  },
  getExamLogOfQuestion(examId, studentId) {
    return apiClient.get(`/exam-log/${examId}/${studentId}`);
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
