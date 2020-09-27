import meetingServices from "../../api/services/meeting";

export const namespaced = true;

export const state = {
  meetings: [],
  meeting: {},
};

export const mutations = {
  SET_MEETINGS(state, meetings) {
    state.meetings = meetings;
  },
  SET_MEETING(state, meeting) {
    state.meeting = meeting;
  },
  ADD_MEETING(state, meeting) {
    state.meetings.unshift(meeting);
  },
  EDIT_MEETING(state, meeting) {
    const target = state.meetings.findIndex(
      (element) => element.meetingId === meeting.meetingId
    );
    state.meetings.splice(target, 1, meeting);
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
    return response.data;
  },
  async getMeeting({ commit, getters, state }, meetingId) {
    if (meetingId == state.meeting.meetingId) return state.meeting;

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
};

export const getters = {
  getByMeetingId: (state) => (meetingId) => {
    return state.meetings.find((meeting) => meeting.meetingId === meetingId);
  },
};
