import choiceServices from "../../api/services/choice";

export const namespaced = true;

export const state = {
  choices: [],
};

export const mutations = {
  SET_CHOICES(state, choices) {
    state.choices = choices;
  },
  ADD_CHOICE(state, choices) {
    state.choices.push(choices);
  },
  EDIT_CHOICE(state, choice) {
    const target = state.choices.findIndex(
      (element) => element.choiceId === choice.choiceId
    );

    state.choices.splice(target, 1, choice);
  },
  DELETE_CHOICE(state, choiceId) {
    const target = state.choices.findIndex(
      (element) => element.choiceId === choiceId
    );

    state.choices.splice(target, 1);
  },
};

export const actions = {
  async createChoices({ commit }, choices) {
    try {
      const response = await choiceServices.createChoices(choices);
      if (response.data.question.questionType == "ปรนัย") {
        commit("question/ADD_QUESTION_IN_EXAM", response.data.question, {
          root: true,
        });
      }
      commit("ADD_CHOICE", response.data.newChoice);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async getAllChoices({ commit }) {
    try {
      const response = await choiceServices.getAllChoices();
      commit("SET_CHOICES", response.data.allChoice);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async getChoicesInQuestion({ commit }, questionId) {
    try {
      const response = await choiceServices.getChoicesInQuestion(questionId);
      commit("SET_CHOICES", response.data.choicesInQuestion);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async editChoice({ commit }, choice) {
    try {
      const response = await choiceServices.updateChoices(choice);
      if (response.data.question.questionType == "ปรนัย") {
        commit("question/EDIT_QUESTION_IN_EXAM", response.data.question, {
          root: true,
        });
      }
    } catch (error) {
      return Promise.reject(error);
    }
    // commit("EDIT_CHOICE", response.data.updateChoice);
  },
  async deleteChoice({ commit }, choice) {
    try {
      await choiceServices.deleteChoices(choice);
      commit("DELETE_CHOICE", choice.choiceId);
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export const getters = {
  getByChoiceId: (state) => (choiceId) => {
    return state.choices.find((choice) => choice.choiceId == choiceId);
  },
};
