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
  ADD_QUESTION_IN_EXAM(state, question) {
    if (state.questionsInExam == undefined) state.questionsInExam = [];
    state.questionsInExam.push(question);
  },
  EDIT_QUESTION(/*state, question*/) {
    // const target = state.questions.findIndex(
    //   (element) => element.questionId === question.questionId
    // );
    // state.questions.splice(target, 1, question);
  },
  EDIT_QUESTION_IN_EXAM(state, question) {
    const target = state.questionsInExam.findIndex(
      (element) => element.questionId === question.questionId
    );

    state.questionsInExam.splice(target, 1, question);
  },
  DELETE_QUESTION(state, questionId) {
    const target = state.questions.findIndex(
      (element) => element.questionId == questionId
    );

    state.questions.splice(target, 1);
  },
  DELETE_QUESTION_IN_EXAM(state, questionId) {
    const target = state.questionsInExam.findIndex(
      (element) => element.questionId == questionId
    );

    state.questionsInExam.splice(target, 1);
  },
};

export const actions = {
  async createQuestion({ commit }, question) {
    try {
      const response = await questionServices.createQuestion(question);
      commit("ADD_QUESTION", response.data.newQuestion);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async importQuestionsInExam({ commit }, questionsInExam) {
    try {
      const response = await questionServices.importQuestionsInExam(
        questionsInExam
      );
      response.data.newQuestion.map((question) =>
        commit("question/ADD_QUESTION_IN_EXAM", question, {
          root: true,
        })
      );
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  // async getAllQuestions({ commit }) {
  //   const response = await questionServices.getAllQuestions();
  //   commit("SET_QUESTIONS", response.data.allQuestion);
  //   return response.data;
  // },
  async getQuestionsInExam({ commit }, examId) {
    try {
      const response = await questionServices.getQuestionsInExam(examId);
      commit("SET_QUESTIONS_IN_EXAM", response.data.getQuestions);
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async searchQuestions({ commit }, { examId, queryString }) {
    try {
      let response;
      if (queryString) {
        response = await questionServices.searchQuestions(
          examId,
          `?${queryString}`
        );
      } else {
        response = await questionServices.searchQuestions(examId);
      }
      commit("SET_QUESTIONS", response.data.getQuestions);
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async getQuestion({ commit, getters }, questionId) {
    try {
      const target = getters.getByExamId(questionId);

      if (target) {
        commit("SET_QUESTION", target);
        return target;
      }

      const response = await questionServices.getQuestion(questionId);
      commit("SET_QUESTION", response.data.target);
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async editQuestion({ commit }, question) {
    try {
      const response = await questionServices.updateQuestion(question);
      commit("EDIT_QUESTION", response.data.updateQuestion);
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async deleteQuestion({ commit }, { examId, questionId }) {
    try {
      await questionServices.deleteQuestion(examId, questionId);
      await commit("DELETE_QUESTION_IN_EXAM", questionId);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export const getters = {
  getByQuestionId: (state) => (questionId) => {
    return state.questions.find(
      (question) => question.questionId == questionId
    );
  },
};
