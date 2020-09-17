import examServices from "../../api/services/exam";

export const namespaced = true;

export const state = {
  exams: [],
  exam: {},
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
      (element) => element.examId === exam.examId
    );

    state.exams.splice(target, 1, exam);
  },
  DELETE_EXAM(state, examId) {
    const target = state.exams.findIndex(
      (element) => element.examId === examId
    );

    state.exams.splice(target, 1);
  },
};

export const actions = {
  async createExam({ commit }, exam) {
    const response = await examServices.createExam(exam);
    commit("ADD_EXAM", response.data.newExam);
  },
  async getAllExams({ commit }, queryString) {
    const response = await examServices.getAllExams(queryString);

    commit("SET_TEACHER", response.data.exams);
  },
  async getExam({ commit, getters }, exam) {
    const { subjectId, examId } = exam;

    const target = getters.getByExamId(subjectId);

    if (target) {
      commit("SET_EXAM", target);
      return target;
    }

    const response = await examServices.getExam(subjectId, examId);
    commit("SET_EXAM", response.data.exam);
  },
  async editExam({ commit }, exam) {
    const { subjectId } = exam;
    const response = await examServices.updateExam(subjectId, exam);
    commit("EDIT_EXAM", response.data.updateExam);
  },
  async deleteExam({ commit }, exam) {
    const { subjectId, examId } = exam;
    await examServices.deleteExam(subjectId, examId);
    commit("DELETE_EXAM", examId);
  },
};

export const getters = {
  getByExamId: (state) => (examId) => {
    if (examId == state.exam.examId) return state.exam;

    return state.exams.find((exam) => exam.examId == examId);
  },
};
