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
  EDIT_TAG_OF_QUESTION(state, tag) {
    state.tagsOfQuestion = [];
    state.tagsOfQuestion.push(tag);
  },
  DELETE_TAG(state, tagId) {
    const target = state.tags.findIndex((element) => element.tagId === tagId);
    state.tags.splice(target, 1);
  },
};

export const actions = {
  async createTag({ commit }, tag) {
    try {
      const response = await tagServices.createTag(tag);
      commit("ADD_TAG", response.data.newTag);
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async addTagToQuestion({ commit }, tag) {
    try {
      const response = await tagServices.addTagToQuestion(tag);
      commit("ADD_TAG_OF_QUESTION", response.data.newTagsInQuestion);
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async getAllTags({ commit }) {
    try {
      const response = await tagServices.getAllTags();
      commit("SET_TAGS", response.data.allTag);
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async getTagsInQuestion({ commit }, questionId) {
    try {
      const response = await tagServices.getTagsInQuestion(questionId);
      commit("SET_TAGS_OF_QUESTION", response.data.tagsOfQuestion);
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async getTag({ commit, getters }, tagId) {
    try {
      const target = getters.getByTagId(tagId);

      if (target) {
        commit("SET_TAG", target);
        return target;
      }

      const response = await tagServices.getTag(tagId);
      commit("SET_TAG", response.data.target);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async updateTag({ commit }, tag) {
    try {
      const { tagId, tagName } = tag;
      const response = await tagServices.updateTag(tagId, tagName);
      commit("EDIT_TAG", tag);
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async updateTagsInQuestion({ commit }, tag) {
    try {
      const response = await tagServices.updateTagsInQuestion(tag);
      commit("EDIT_TAG_OF_QUESTION", response.data);
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async deleteTag({ commit }, tagId) {
    try {
      const response = await tagServices.deleteTag(tagId);
      commit("DELETE_TAG", tagId);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export const getters = {
  getByTagId: (state) => (tagId) => {
    if (tagId == state.tag.tagId) return state.tag;

    return state.tags.find((tag) => tag.tagId === tagId);
  },
};
