import { apiClient } from "../axios";

const endpoint = "meeting";

export default {
  createMeeting(meeting) {
    return apiClient.post(`/${endpoint}`, meeting);
  },
  addInvitedStudent(meeting) {
    return apiClient.post(`/${endpoint}`, meeting);
  },
  getAllMeetings() {
    return apiClient.get(`/${endpoint}`);
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
};
