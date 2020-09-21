import imageServices from "../../api/services/image";

export const namespaced = true;

export const state = {
  image: {},
};

export const mutations = {
  SET_IMAGE(state, image) {
    state.image = image;
  },
  DELETE_IMAGE(state) {
    state.image = undefined;
  },
};

export const actions = {
  async uploadImage({ commit }, image) {
    const response = await imageServices.uploadImage(image);
    commit("SET_IMAGE", response.data.newImage);
  },
  async changeImage({ commit }, image) {
    const response = await imageServices.updateExam(image);
    commit("SET_IMAGE", response.data.updateImage);
  },
  async deleteImage({ commit }, imageId) {
    await imageServices.deleteExam(imageId);
    commit("DELETE_IMAGE");
  },
};

export const getters = {};
