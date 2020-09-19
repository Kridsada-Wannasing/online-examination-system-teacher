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
  async getAllExams({ commit }, subjectId) {
    const response = await examServices.getAllExams(subjectId);
    console.log(response.data.allExam);
    commit("SET_EXAMS", response.data.allExam);
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
    return state.exams.find((exam) => exam.examId == examId);
  },
};
