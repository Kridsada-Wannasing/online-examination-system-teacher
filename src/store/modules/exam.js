import examServices from "../../api/services/exam";

export const namespaced = true;

export const state = {
  exams: [],
  exam: {}
};

export const mutations = {
  SET_EXAMS(state, exams) {
    state.exams = exams;
  },
  SET_EXAM(state, exam) {
    state.exam = exam;
  },
  ADD_EXAM(state, exam) {
    state.exams.unshift(exam);
  },
  EDIT_EXAM(state, exam) {
    const target = state.exams.findIndex(
      element => element.examId == exam.examId
    );

    state.exams.splice(target, 1, exam);
  },
  DELETE_EXAM(state, examId) {
    const target = state.exams.findIndex(element => element.examId == examId);

    state.exams.splice(target, 1);
  }
};

export const actions = {
  async createExam({ commit }, exam) {
    const response = await examServices.createExam(exam);
    commit("ADD_EXAM", response.data.newExam);
    return response.data;
  },
  async duplicateExam({ commit }, examId) {
    const response = await examServices.duplicateExam(examId);
    commit("ADD_EXAM", response.data.newDuplicateExam);
    return response.data;
  },
  async getAllExams({ commit }, { subjectId, query }) {
    let response;
    if (query) {
      response = await examServices.getAllExams(subjectId, query);
    } else {
      response = await examServices.getAllExams(subjectId);
    }
    commit("SET_EXAMS", response.data.allExam);
    return response.data;
  },
  async getExam({ commit, state, getters }, exam) {
    if (exam.examId == state.exam.examId) return state.exam;

    const target = getters.getByExamId(exam.examId);

    if (target) {
      commit("SET_EXAM", target);
      return target;
    }

    const response = await examServices.getExam(exam.subjectId, exam.examId);
    commit("SET_EXAM", response.data.target);
    return response.data;
  },
  async editExam({ commit }, exam) {
    const response = await examServices.updateExam(exam);
    commit("EDIT_EXAM", response.data.updateExam);
    return response.data;
  },
  async deleteExam({ commit }, examId) {
    await examServices.deleteExam(examId);
    commit("DELETE_EXAM", examId);
  }
};

export const getters = {
  getByExamId: state => examId => {
    return state.exams.find(exam => exam.examId == examId);
  }
};
