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
    const response = await imageServices.getAllImages();
    commit("SET_IMAGES", response.data.allImages);
  },
  async getImageInQuestion({ commit }, questionId) {
    const response = await imageServices.getImageInQuestion(questionId);
    commit("SET_IMAGE", response.data.image);
  },
  async uploadImage({ commit }, image) {
    const response = await imageServices.uploadImage(image);
    commit("SET_IMAGE", response.data.newImage);
  },
  async changeImage({ commit }, image) {
    const response = await imageServices.changeImage(image);
    commit("SET_IMAGE", response.data.updateImage);
  },
  async deleteImage({ commit }, imageId) {
    await imageServices.deleteImage(imageId);
    commit("DELETE_IMAGE");
  },
};

export const getters = {
  getByQuestionId: (state) => (questionId) => {
    return state.images.find((image) => image.questionId == questionId);
  },
};
