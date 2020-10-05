import meetingServices from "../../api/services/meeting";

export const namespaced = true;

export const state = {
  meetings: [],
  meeting: {},
  students: [],
};

export const mutations = {
  SET_MEETINGS(state, meetings) {
    state.meetings = meetings;
  },
  SET_MEETING(state, meeting) {
    state.meeting = meeting;
  },
  SET_STUDENT_IN_MEETING(state, student) {
    state.students = student;
  },
  ADD_MEETING(state, meeting) {
    state.meetings.unshift(meeting);
  },
  ADD_STUDENT_IN_MEETING(state, student) {
    state.students.push(student);
  },
  EDIT_MEETING(state, meeting) {
    const target = state.meetings.findIndex(
      (element) => element.meetingId == meeting.meetingId
    );
    state.meetings.splice(target, 1, meeting);
  },
  EDIT_STUDENT_IN_MEETING(state, student) {
    state.students.push(student);
  },
  DELETE_MEETING(state, meetingId) {
    const target = state.meetings.findIndex(
      (element) => element.meetingId === meetingId
    );
    state.meetings.splice(target, 1);
  },
  DELETE_STUDENT_IN_MEETING(state, studentId) {
    const target = state.students.findIndex(
      (element) => element.studentId == studentId
    );
    state.students.splice(target, 1);
  },
};

export const actions = {
  async createMeeting({ commit }, meeting) {
    const response = await meetingServices.createMeeting(meeting);
    commit("ADD_MEETING", response.data.newMeeting);
    return response.data;
  },
  async getAllMeetings({ commit }, query) {
    let response;
    if (query) {
      response = await meetingServices.getAllMeetings(query);
    } else {
      response = await meetingServices.getAllMeetings();
    }
    commit("SET_MEETINGS", response.data.allMeeting);
    return response;
  },
  async createStudentInMeeting({ commit }, students) {
    const response = await meetingServices.createStudentInMeeting(students);
    console.log(response.data.students);
    if (Array.isArray(response.data.students))
      response.data.students.map((student) =>
        commit("ADD_STUDENT_IN_MEETING", student)
      );
    return response.data;
  },
  async getAllStudentInMeeting({ commit }, meetingId) {
    const response = await meetingServices.getAllStudentInMeeting(meetingId);
    commit("SET_STUDENT_IN_MEETING", response.data.students);
    return response.data;
  },
  async getMeeting({ commit, getters }, meetingId) {
    const target = getters.getByMeetingId(meetingId);

    if (target) {
      commit("SET_MEETING", target);
      return target;
    }

    const response = await meetingServices.getMeeting(meetingId);
    commit("SET_MEETING", response.data.target);
    return response.data;
  },
  async updateMeeting({ commit }, meeting) {
    const response = await meetingServices.updateMeeting(meeting);
    commit("EDIT_MEETING", response.data.updatedMeeting);
    return response.data;
  },
  async deleteMeeting({ commit }, meetingId) {
    await meetingServices.deleteMeeting(meetingId);
    commit("DELETE_MEETING", meetingId);
  },
  async deleteStudentInMeeting({ commit }, studentId) {
    // await meetingServices.deleteStudentInMeeting(studentId);
    commit("DELETE_STUDENT_IN_MEETING", studentId);
  },
};

export const getters = {
  getByMeetingId: (state) => (meetingId) => {
    return state.meetings.find((meeting) => meeting.meetingId == meetingId);
  },
  getInvitedStudentByMeetingId: (state) => (meetingId) => {
    return state.students.filter((student) => student.meetingId == meetingId);
  },
};
