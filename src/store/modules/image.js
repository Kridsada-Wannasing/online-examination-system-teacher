import imageServices from "../../api/services/image";
import axios from "axios";

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
  async uploadImage({ commit }, image) {
    const response = await imageServices.uploadImage(image);
    commit("SET_IMAGE", response.data.newImage);
  },
  showImage(name) {
    return axios.get(`localhost:8000/static/${name}`);
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

export const getters = {
  getByQuestionId: (state) => (questionId) => {
    return state.images.find((image) => image.questionId == questionId);
  },
};
