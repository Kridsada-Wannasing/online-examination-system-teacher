import teacherServices from "../../api/services/teacher";

export const namespaced = true;

export const state = {
  teacher: {}
};

export const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
    localStorage.setItem("token_teacher", token);
  },
  SET_TEACHER(state, teacher) {
    state.teacher = teacher;
    localStorage.setItem("teacher", JSON.stringify(teacher));
  },
  CLEAR_TEACHER() {
    localStorage.removeItem("token_teacher");
    localStorage.removeItem("teacher");
    location.reload();
  }
};

export const actions = {
  async login({ commit }, credentials) {
    const response = await teacherServices.login(credentials);

    commit("SET_TOKEN", response.data.token);
    commit("SET_TEACHER", response.data.teacher);

    return response.data;
  },
  logout({ commit }) {
    commit("CLEAR_TEACHER");
  },
  async updateMe({ commit }, data) {
    const response = await teacherServices.updateMe(data);

    commit("SET_TEACHER", response.data.teacher);
    return response.data;
  },
  updatePassword(updatePassword) {
    console.log(
      updatePassword.oldPassword,
      updatePassword.candidateNewPassword
    );
    return teacherServices
      .updatePassword(updatePassword)
      .then(response => response.data)
      .catch(error => Promise.reject(error));
  },
  async forgotPassword(email) {
    const response = await teacherServices.forgotPassword(email);
    return response.data;
  }
};

export const getters = {};
