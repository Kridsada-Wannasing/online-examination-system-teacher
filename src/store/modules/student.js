import studentServices from "../../api/services/student";

export const namespaced = true;

export const state = {
  students: [],
};

export const mutations = {
  SET_STUDENTS(state, students) {
    state.students = students;
  },
  ADD_STUDENT(state, students) {
    state.students.push(students);
  },
};

export const actions = {
  async registerStudents({ commit }, newStudents) {
    const response = await studentServices.registerStudents(newStudents);
    commit("ADD_STUDENT", response.data.newStudents);
    return response.data.newStudents;
  },
  async getAllStudents({ commit }) {
    const response = await studentServices.getAllStudents();
    commit("SET_STUDENTS", response.data.allStudents);
    return response.data.newStudents;
  },
};

export const getters = {};
