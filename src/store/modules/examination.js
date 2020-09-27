import examinationServices from "../../api/services/examination";

export const namespaced = true;

export const state = {
  examinations: [],
  examination: {},
};

export const mutations = {
  SET_EXAMINATIONS(state, examinations) {
    state.examinations = examinations;
  },
  SET_EXAMINATION(state, examination) {
    state.examination = examination;
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
};

export const actions = {
  async createExamination({ commit }, examination) {
    const response = await examinationServices.createExamination(examination);
    commit("ADD_EXAMINATION", response.data.newExamination);
    return response.data;
  },
  async getAllExaminations({ commit }) {
    const response = await examinationServices.getAllExaminations();

    commit("SET_EXAMINATIONS", response.data.allExamination);
    return response.data;
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
