import choiceServices from "../../api/services/choice";

export const namespaced = true;

export const state = {
  choices: [],
};

export const mutations = {
  SET_CHOICES(state, choices) {
    state.choices = choices;
  },
  ADD_CHOICE(state, choice) {
    state.choices.unshift(choice);
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
  async createChoice({ commit }, choice) {
    const response = await choiceServices.createChoice(choice);
    commit("ADD_CHOICE", response.data.newChoice);
  },
  async getAllChoices({ commit }, questionId) {
    const response = await choiceServices.getAllChoices(questionId);
    commit("SET_CHOICES", response.data.choices);
  },
  async editChoice({ commit }, choice) {
    const response = await choiceServices.updateChoices(choice);
    commit("EDIT_CHOICE", response.data.updateChoice);
  },
  async deleteChoice({ commit }, choice) {
    await choiceServices.deleteChoices(choice);
    commit("DELETE_CHOICE", choice.choiceId);
  },
};

export const getters = {
  getByChoiceId: (state) => (choiceId) => {
    return state.choices.find((choice) => choice.choiceId == choiceId);
  },
};
