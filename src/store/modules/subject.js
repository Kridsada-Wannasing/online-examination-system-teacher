import subjectServices from "../../api/services/subject";

export const namespaced = true;

export const state = {
  subjects: [],
  subject: {}
};

export const mutations = {
  SET_SUBJECTS(state, subjects) {
    state.subjects = subjects;
  },
  SET_SUBJECT(state, subject) {
    state.subject = subject;
  },
  ADD_SUBJECT(state, subject) {
    state.subjects.push(subject);
  },
  EDIT_SUBJECT(state, subject) {
    const target = state.subjects.findIndex(
      element => element.subjectId == subject.subjectId
    );
    state.subjects.splice(target, 1, subject);
  },
  DELETE_SUBJECT(state, subjectId) {
    const target = state.subjects.findIndex(
      element => element.subjectId == subjectId
    );
    state.subjects.splice(target, 1);
  }
};

export const actions = {
  async createSubject({ commit }, subject) {
    const response = await subjectServices.createSubject(subject);
    commit("ADD_SUBJECT", response.data.newSubject);
    return response.data;
  },
  async getAllSubjects({ commit }) {
    const response = await subjectServices.getAllSubjects();
    commit("SET_SUBJECTS", response.data.allSubject);
    return response.data;
  },
  async getSubject({ commit, getters, state }, subjectId) {
    if (subjectId == state.subject.subjectId) return state.subject;

    const target = getters.getBySubjectId(subjectId);

    if (target) {
      commit("SET_SUBJECT", target);
      return target;
    }

    const response = await subjectServices.getSubject(subjectId);
    commit("SET_SUBJECT", response.data.target);
    return response.data.target;
  },
  async updateSubject({ commit }, subject) {
    const response = await subjectServices.updateSubject(subject);
    commit("EDIT_SUBJECT", subject);
    return response.data;
  },
  async deleteSubject({ commit }, subjectId) {
    const response = await subjectServices.deleteSubject(subjectId);
    commit("DELETE_SUBJECT", subjectId);
    return response;
  }
};

export const getters = {
  getBySubjectId: state => subjectId => {
    return state.subjects.find(subject => subject.subjectId == subjectId);
  }
};
