import tagServices from "../../api/services/tag";

export const namespaced = true;

export const state = {
  tags: [],
  tagsOfQuestion: [],
};

export const mutations = {
  SET_TAGS(state, tags) {
    state.tags = tags;
  },
  SET_TAGS_OF_QUESTION(state, tags) {
    state.tagsOfQuestion = tags;
  },
  ADD_TAG(state, tag) {
    state.tags.push(tag);
  },
  ADD_TAG_OF_QUESTION(state, tag) {
    state.tagsOfQuestion.push(tag);
  },
  EDIT_TAG(state, tag) {
    const target = state.tags.findIndex(
      (element) => element.tagId === tag.tagId
    );
    state.tags.splice(target, 1, tag);
  },
  DELETE_TAG(state, tagId) {
    const target = state.tags.findIndex((element) => element.tagId === tagId);
    state.tags.splice(target, 1);
  },
};

export const actions = {
  async createTag({ commit }, tag) {
    const response = await tagServices.createTag(tag);
    commit("ADD_TAG", response.data.newTag);
    return response.data;
  },
  async addTagToQuestion({ commit }, tag) {
    const response = await tagServices.addTagToQuestion(tag);
    commit("ADD_TAG_OF_QUESTION", response.data.newTagsInQuestion);
    return response;
  },
  async getAllTags({ commit }) {
    const response = await tagServices.getAllTags();
    commit("SET_TAGS", response.data.allTag);
    return response;
  },
  async getTagsInQuestion({ commit }, questionId) {
    const response = await tagServices.getTagsInQuestion(questionId);
    commit("SET_TAGS_OF_QUESTION", response.data.tagsOfQuestion);
    return response;
  },
  async getTag({ commit, getters }, tagId) {
    const target = getters.getByTagId(tagId);

    if (target) {
      commit("SET_TAG", target);
      return target;
    }

    const response = await tagServices.getTag(tagId);
    commit("SET_TAG", response.data.target);
    return response;
  },
  async updateTag({ commit }, tag) {
    const response = await tagServices.updateTag(tag);
    commit("EDIT_TAG", response.data);
    return response;
  },
  async deleteTag({ commit }, tagId) {
    const response = await tagServices.deleteTag(tagId);
    commit("DELETE_TAG", response.data);
    return response;
  },
};

export const getters = {
  getByTagId: (state) => (tagId) => {
    if (tagId == state.tag.tagId) return state.tag;

    return state.tags.find((tag) => tag.tagId === tagId);
  },
};
