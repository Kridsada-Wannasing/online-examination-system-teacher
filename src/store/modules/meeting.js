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
      (element) => element.meetingId === meeting.meetingId
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
};

export const actions = {
  async createMeeting({ commit }, meeting) {
    const response = await meetingServices.createMeeting(meeting);
    commit("ADD_MEETING", response.data.meeting);
    return response.data;
  },
  async getAllMeetings({ commit }) {
    const response = await meetingServices.getAllMeetings();
    commit("SET_MEETINGS", response.data.allMeeting);
    return response;
  },
  async addInvitedStudent({ commit }, invitedStudent) {
    const response = await meetingServices.addInvitedStudent(invitedStudent);
    commit("ADD_STUDENT_IN_MEETING", response.data.studentMeeting);
    return response;
  },
  async getMeeting({ commit }, meetingId) {
    const response = await meetingServices.getMeeting(meetingId);
    commit("SET_MEETING", response.data.target);
    commit("SET_STUDENT_IN_MEETING", response.data.target.StudentMeeting);
    return response;
  },
  async updateMeeting({ commit }, meeting) {
    const response = await meetingServices.updateMeeting(meeting);
    commit("EDIT_MEETING", response.data.updatedMeeting);
    return response;
  },
  async deleteMeeting({ commit }, meetingId) {
    await meetingServices.deleteMeeting(meetingId);
    commit("DELETE_MEETING", meetingId);
  },
};

export const getters = {
  getByMeetingId: (state) => (meetingId) => {
    return state.meetings.find((meeting) => meeting.meetingId === meetingId);
  },
  getInvitedStudentByMeetingId: (state) => (meetingId) => {
    return state.students.filter((student) => student.meetingId === meetingId);
  },
};
