import questionServices from "../../api/services/question";

export const namespaced = true;

export const state = {
  questions: [],
  question: {},
  questionsInExam: [],
};

export const mutations = {
  SET_QUESTIONS(state, questions) {
    state.questions = questions;
  },
  SET_QUESTIONS_IN_EXAM(state, questions) {
    state.questionsInExam = questions;
  },
  SET_QUESTION(state, question) {
    state.question = question;
  },
  ADD_QUESTION(state, question) {
    state.questions.push(question);
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
    commit("ADD_QUESTION", response.data.newQuestion);
    return response.data;
  },
  async getAllQuestions({ commit }) {
    const response = await questionServices.getAllQuestions();
    commit("SET_QUESTIONS", response.data.allQuestion);
    return response.data;
  },
  async getQuestionsInExam({ commit }, examId) {
    const response = await questionServices.getQuestionsInExam(examId);
    commit("SET_QUESTIONS_IN_EXAM", response.data.getQuestions);
    return response.data;
  },
  async getQuestion({ commit, getters }, questionId) {
    const target = getters.getByExamId(questionId);

    if (target) {
      commit("SET_QUESTION", target);
      return target;
    }

    const response = await questionServices.getQuestion(questionId);
    commit("SET_QUESTION", response.data.target);
    return response.data;
  },
  async editQuestion({ commit }, question) {
    const response = await questionServices.updateQuestion(question);
    commit("EDIT_QUESTION", response.data.updateQuestion);
    return response.data;
  },
  async deleteQuestion({ commit }, questionId) {
    await questionServices.deleteQuestion(questionId);
    commit("DELETE_QUESTION", questionId);
  },
};

export const getters = {
  getByQuestionId: (state) => (questionId) => {
    return state.questions.find(
      (question) => question.questionId == questionId
    );
  },
};
