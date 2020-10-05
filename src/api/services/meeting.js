import { apiClient } from "../axios";

const endpoint = "meeting";

export default {
  createMeeting(meeting) {
    return apiClient.post(`/${endpoint}`, meeting);
  },
  createStudentInMeeting(students) {
    return apiClient.post("student-meeting", students);
  },
  getAllStudentInMeeting(meetingId) {
    return apiClient.get(`/student-meeting/${meetingId}`);
  },
  getAllMeetings(query) {
    if (query) return apiClient.get(`/${endpoint}?${query}`);
    else return apiClient.get(`/${endpoint}`);
  },
  getMeeting(meetingId) {
    return apiClient.get(`/${endpoint}/${meetingId}`);
  },
  updateMeeting(meeting) {
    return apiClient.patch(`/${endpoint}/${meeting.meetingId}`, meeting);
  },
  deleteMeeting(meetingId) {
    return apiClient.delete(`/${endpoint}/${meetingId}`);
  },
  deleteStudentInMeeting(meetingId, studentId) {
    return apiClient.delete(`/${endpoint}/${meetingId}/${studentId}`);
  },
};
