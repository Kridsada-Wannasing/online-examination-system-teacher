import subjectServices from "../../api/services/subject";

export const namespaced = true;

export const state = {
  subjects: [],
  subject: {},
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
  EDIT_SUBJECT(state, { subject, oldSubjectId }) {
    const target = state.subjects.findIndex(
      (element) => element.subjectId == oldSubjectId
    );
    state.subjects.splice(target, 1, subject);
  },
  DELETE_SUBJECT(state, subjectId) {
    const target = state.subjects.findIndex(
      (element) => element.subjectId == subjectId
    );
    state.subjects.splice(target, 1);
  },
};

export const actions = {
  async createSubject({ commit }, subject) {
    try {
      const response = await subjectServices.createSubject(subject);
      commit("ADD_SUBJECT", response.data.newSubject);
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async getAllSubjects({ commit }) {
    try {
      const response = await subjectServices.getAllSubjects();
      commit("SET_SUBJECTS", response.data.allSubject);
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async getSubject({ commit, getters, state }, subjectId) {
    try {
      if (subjectId == state.subject.subjectId) return state.subject;

      const target = getters.getBySubjectId(subjectId);

      if (target) {
        commit("SET_SUBJECT", target);
        return target;
      }

      const response = await subjectServices.getSubject(subjectId);
      commit("SET_SUBJECT", response.data.target);
      return response.data.target;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async updateSubject({ commit }, { subjectName, subjectId, oldSubjectId }) {
    try {
      const subject = {
        subjectId,
        subjectName,
      };
      const response = await subjectServices.updateSubject(
        subject,
        oldSubjectId
      );
      commit("EDIT_SUBJECT", { subject, oldSubjectId });
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async deleteSubject({ commit }, subjectId) {
    try {
      const response = await subjectServices.deleteSubject(subjectId);
      commit("DELETE_SUBJECT", subjectId);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export const getters = {
  getBySubjectId: (state) => (subjectId) => {
    return state.subjects.find((subject) => subject.subjectId == subjectId);
  },
};
