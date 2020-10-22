import examinationServices from "../../api/services/examination";

export const namespaced = true;

export const state = {
  examinations: [],
  examination: {},
  examLogs: [],
};

export const mutations = {
  SET_EXAMINATIONS(state, examinations) {
    state.examinations = examinations;
  },
  SET_EXAMINATION(state, examination) {
    state.examination = examination;
  },
  SET_EXAM_LOGS(state, examLogs) {
    state.examLogs = examLogs;
  },
  ADD_EXAMINATION(state, examination) {
    state.examinations.unshift(examination);
  },
  EDIT_EXAMINATION(state, examination) {
    const target = state.examinations.findIndex(
      (element) => element.examinationId === examination.examinationId
    );

    state.examinations.splice(target, 1, examination);
  },
  DELETE_EXAMINATION(state, examinationId) {
    const target = state.examinations.findIndex(
      (element) => element.examinationId === examinationId
    );

    state.examinations.splice(target, 1);
  },
  DELETE_EXAM_LOGS(state, examLogId) {
    const target = state.examLogs.findIndex(
      (element) => element.examLogId == examLogId
    );

    state.examLogs.splice(target, 1);
  },
};

export const actions = {
  async createExamination({ commit }, examination) {
    const response = await examinationServices.createExamination(examination);
    commit("ADD_EXAMINATION", response.data.newExamination);
    return response.data;
  },
  async getExamLogOfQuestion({ commit }, { examId, studentId }) {
    try {
      const response = await examinationServices.getExamLogOfQuestion(
        examId,
        studentId
      );

      commit("SET_EXAM_LOGS", response.data.examLogs);
      return response.data;
    } catch (error) {
      Promise.reject(error);
    }
  },
  async getExamination({ commit, getters, state }, examinationId) {
    if (examinationId == state.examination.examinationId)
      return state.examination;

    const target = getters.getByExaminationId(examinationId);

    if (target) {
      commit("SET_EXAMINATION", target);
      return target;
    }

    const response = await examinationServices.getExamination(examinationId);
    commit("SET_EXAMINATION", response.data.examination);
  },
  async editExamination({ commit }, examination) {
    const response = await examinationServices.updateExamination(examination);
    commit("EDIT_EXAMINATION", response.data.updateExamination);
    return response.data;
  },
  async deleteExamination({ commit }, examinationId) {
    await examinationServices.deleteExamination(examinationId);
    commit("DELETE_EXAMINATION", examinationId);
  },
};

export const getters = {
  getByExaminationId: (state) => (examinationId) => {
    return state.examinations.find(
      (examination) => examination.examinationId == examinationId
    );
  },
};
