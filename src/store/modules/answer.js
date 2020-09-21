import answerServices from "../../api/services/answer";

export const namespaced = true;

export const state = {
  answers: [],
  answer: {},
};

export const mutations = {
  SET_ANSWERS(state, answers) {
    state.answers = answers;
  },
  ADD_ANSWER(state, answer) {
    state.answers.unshift(answer);
  },
  EDIT_ANSWER(state, answer) {
    const target = state.answers.findIndex(
      (element) => element.answerId === answer.answerId
    );

    state.answers.splice(target, 1, answer);
  },
  DELETE_ANSWER(state, answerId) {
    const target = state.answers.findIndex(
      (element) => element.answerId === answerId
    );

    state.answers.splice(target, 1);
  },
};

export const actions = {
  async createAnswer({ commit }, answer) {
    const response = await answerServices.createAnswer(answer);
    commit("ADD_ANSWER", response.data.newAnswer);
  },
  async getAllAnswers({ commit }, questionId) {
    const response = await answerServices.getAllAnswers(questionId);
    commit("SET_ANSWERS", response.data.allAnswer);
  },
  async editAnswer({ commit }, answer) {
    const response = await answerServices.updateAnswer(answer);
    commit("EDIT_ANSWER", response.data.updateAnswer);
  },
  async deleteAnswer({ commit }, answerId) {
    await answerServices.deleteAnswer(answerId);
    commit("DELETE_ANSWER", answerId);
  },
};

export const getters = {};
