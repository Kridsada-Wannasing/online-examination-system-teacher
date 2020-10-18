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
    try {
      const response = await meetingServices.createMeeting(meeting);
      commit("ADD_MEETING", response.data.newMeeting);
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async getAllMeetings({ commit }, query) {
    try {
      let response;
      if (query) {
        response = await meetingServices.getAllMeetings(query);
      } else {
        response = await meetingServices.getAllMeetings();
      }
      commit("SET_MEETINGS", response.data.allMeeting);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async createStudentInMeeting({ commit }, students) {
    try {
      const response = await meetingServices.createStudentInMeeting(students);
      if (Array.isArray(response.data.students))
        response.data.students.map((student) =>
          commit("ADD_STUDENT_IN_MEETING", student)
        );
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async getAllStudentInMeeting({ commit }, meetingId) {
    try {
      const response = await meetingServices.getAllStudentInMeeting(meetingId);
      commit("SET_STUDENT_IN_MEETING", response.data.students);
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async getMeeting({ commit, getters }, meetingId) {
    try {
      const target = getters.getByMeetingId(meetingId);

      if (target) {
        commit("SET_MEETING", target);
        return target;
      }

      const response = await meetingServices.getMeeting(meetingId);
      commit("SET_MEETING", response.data.target);
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async updateMeeting({ commit }, meeting) {
    try {
      const response = await meetingServices.updateMeeting(meeting);
      commit("EDIT_MEETING", response.data.updatedMeeting);
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async deleteMeeting({ commit }, meetingId) {
    try {
      await meetingServices.deleteMeeting(meetingId);
      commit("DELETE_MEETING", meetingId);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async deleteStudentInMeeting({ commit }, { meetingId, studentId }) {
    try {
      await meetingServices.deleteStudentInMeeting(meetingId, studentId);
      commit("DELETE_STUDENT_IN_MEETING", studentId);
    } catch (error) {
      return Promise.reject(error);
    }
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
