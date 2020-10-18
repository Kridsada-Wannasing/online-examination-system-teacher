import imageServices from "../../api/services/image";

export const namespaced = true;

export const state = {
  images: [],
  image: {},
};

export const mutations = {
  SET_IMAGES(state, images) {
    state.images = images;
  },
  SET_IMAGE(state, image) {
    state.image = image;
  },
  DELETE_IMAGE(state) {
    state.image = undefined;
  },
};

export const actions = {
  async getAllImages({ commit }) {
    try {
      const response = await imageServices.getAllImages();
      commit("SET_IMAGES", response.data.allImages);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async getImageInQuestion({ commit }, questionId) {
    try {
      const response = await imageServices.getImageInQuestion(questionId);
      commit("SET_IMAGE", response.data.image);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async uploadImage({ commit }, image) {
    try {
      const response = await imageServices.uploadImage(image);
      commit("SET_IMAGE", response.data.newImage);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async changeImage({ commit }, image) {
    try {
      const response = await imageServices.changeImage(image);
      commit("SET_IMAGE", response.data.updateImage);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async deleteImage({ commit }, imageId) {
    try {
      await imageServices.deleteImage(imageId);
      commit("DELETE_IMAGE");
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export const getters = {
  getByQuestionId: (state) => (questionId) => {
    return state.images.find((image) => image.questionId == questionId);
  },
};
