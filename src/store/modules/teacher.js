import teacherServices from "../../api/services/teacher";

export const namespaced = true;

export const state = {
  teacher: {},
};

export const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
    localStorage.setItem("token", token);
  },
  SET_TEACHER(state, teacher) {
    state.teacher = teacher;
    localStorage.setItem("teacher", JSON.stringify(teacher));
  },
  CLEAR_TEACHER() {
    localStorage.removeItem("token");
    localStorage.removeItem("teacher");
    location.reload();
  },
};

export const actions = {
  async login({ commit }, credentials) {
    const response = await teacherServices.login(credentials);

    commit("SET_TOKEN", response.data.token);
    commit("SET_TEACHER", response.data.teacher);
  },
  logout({ commit }) {
    commit("CLEAR_TEACHER");
  },
  async updateMe({ commit }, data) {
    const response = await teacherServices.updateMe(data);

    commit("SET_TEACHER", response.data.teacher);
  },
  async updatePassword({ oldPassword, newPassword }) {
    await teacherServices.updatePassword(oldPassword, newPassword);
  },
  async forgotPassword(email) {
    await teacherServices.forgotPassword(email);
  },
};

export const getters = {};
