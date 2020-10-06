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
  DELETE_STUDENT(state, studentId) {
    let target = state.students.findIndex(
      (student) => student.studentId == studentId
    );
    state.students.splice(target, 1);
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
  async deleteStudent({ commit }, studentId) {
    const response = await studentServices.deleteStudent(studentId);
    commit("SET_STUDENTS", response.data.allStudents);
    return response.data.newStudents;
  },
};

export const getters = {};
