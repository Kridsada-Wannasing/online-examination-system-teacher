import questionServices from "../../api/services/question";

export const namespaced = true;

export const state = {
  questions: [],
  question: {},
};

export const mutations = {
  SET_QUESTIONS(state, questions) {
    state.questions = questions;
  },
  SET_QUESTION(state, question) {
    state.question = question;
  },
  ADD_QUESTION(state, question) {
    state.questions.unshift(question);
  },
  EDIT_QUESTION(state, question) {
    const target = state.questions.findIndex(
      (element) => element.questionId === question.questionId
    );

    state.questions.splice(target, 1, question);
  },
  DELETE_QUESTION(state, questionId) {
    const target = state.questions.findIndex(
      (element) => element.questionId === questionId
    );

    state.questions.splice(target, 1);
  },
};

export const actions = {
  async createQuestion({ commit }, question) {
    const response = await questionServices.createQuestion(question);
    commit("ADD_QUESTION", response.data.newExam);
  },
  async getAllQuestions({ commit }, queryString) {
    const response = await questionServices.getAllQuestions();

    commit("SET_QUESTIONS", response.data.questions);
  },
  async getQuestion({ commit, getters }, question) {
    const { subjectId, questionId } = question;

    const target = getters.getByQuestionId(subjectId);

    if (target) {
      commit("SET_QUESTION", target);
      return target;
    }

    const response = await questionServices.getExam(subjectId, questionId);
    commit("SET_QUESTION", response.data.question);
  },
  async editQuestion({ commit }, question) {
    const { subjectId } = question;
    const response = await questionServices.updateExam(subjectId, question);
    commit("EDIT_QUESTION", response.data.updateExam);
  },
  async deleteQuestion({ commit }, questionId) {
    const { subjectId } = question;
    await questionServices.deleteExam(subjectId, questionId);
    commit("DELETE_QUESTION", questionId);
  },
};

export const getters = {
  getByQuestionId: (state) => (questionId) => {
    if (questionId == state.question.questionId) return state.question;

    return state.questions.find(
      (question) => question.questionId == questionId
    );
  },
};
