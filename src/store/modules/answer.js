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
    state.answers = answer;
  },
  DELETE_ANSWER(state, answerId) {
    const target = state.answers.findIndex(
      (element) => element.answerId === answerId
    );

    state.answers.splice(target, 1);
  },
};

export const actions = {
  async createAnswers({ commit }, answer) {
    try {
      const response = await answerServices.createAnswers(answer);
      if (response.data.question.questionType == "อัตนัย") {
        commit("question/ADD_QUESTION_IN_EXAM", response.data.question, {
          root: true,
        });
      }
      commit("ADD_ANSWER", response.data.newAnswer);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async getAllAnswers({ commit }) {
    try {
      const response = await answerServices.getAllAnswers();
      commit("SET_ANSWERS", response.data.allAnswer);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async getAnswersInQuestion({ commit }, questionId) {
    try {
      const response = await answerServices.getAnswersInQuestion(questionId);
      commit("SET_ANSWERS", response.data.answersInQuestion);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async editAnswer({ commit }, answer) {
    try {
      const response = await answerServices.updateAnswer(answer);
      if (response.data.question.questionType == "อัตนัย") {
        commit("question/EDIT_QUESTION_IN_EXAM", response.data.question, {
          root: true,
        });
      }
    } catch (error) {
      return Promise.reject(error);
    }
    // commit("EDIT_ANSWER", response.data.updateAnswer);
  },
  async deleteAnswer({ commit }, answerId) {
    try {
      await answerServices.deleteAnswer(answerId);
      commit("DELETE_ANSWER", answerId);
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export const getters = {};
