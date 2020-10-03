<template>
  <div class="h-100 w-100">
    <div class="w-100" style="height: 40%; min-height: 90%; max-height: 90%;">
      <v-card
        class="pa-10 h-100 w-100"
        style="border-radius: 20px; display: inline-table;"
        outlined
      >
        <div
          style="display: flex; justify-content: space-between; height: 20%; min-height: 20%; max-height: 20%;"
        >
          <h3 class="color-dark-blue">ห้องสอบทั้งหมด</h3>
          <v-btn small outlined color="primary" @click="selectMeeting">
            <v-icon left>mdi-plus</v-icon>สร้างห้องสอบ
          </v-btn>
        </div>
        <div
          class="mt-5"
          style="height: 80%; min-height: 80%; max-height: 80%; overflow: auto;"
        >
          <v-row no-gutters>
            <v-col
              class="h-100 mb-5"
              cols="12"
              lg="4"
              md="6"
              sm="6"
              xs="12"
              v-for="(examination, i) in examinations"
              :key="i"
            >
              <Folder
                class="mr-2"
                :color="i % 2 == 0 ? 'green' : 'blue'"
                :examination="examination"
              />
            </v-col>
            <v-col cols="12" lg="4" md="6" sm="6" xs="12" class="h-100 mb-5">
              <Folder class="mr-2" color="plus" />
            </v-col>
          </v-row>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Folder from "../components/Folder";

export default {
  components: {
    Folder,
  },
  data() {
    return {
      password: "",
      startExam: "",
      endExam: "",
      examId: null,
      invitedStudents: [],
      status: true,
    };
  },
  computed: {
    ...mapState("examination", ["examinations"]),
    // ...mapState("meeting", ["meetings"]),
  },
  mounted() {
    this.$store.dispatch("examination/getAllExaminations");
    // this.$store.dispatch("meeting/getAllMeetings");
  },
  methods: {
    // async createExamination(meetingId) {
    //   await this.$store.dispatch(
    //     "examination/createExamination",
    //     {
    //       password: this.password,
    //       startExam: this.startExam,
    //       endExam: this.endExam,
    //       meetingId,
    //     }
    //   );
    //   if(this.invitedStudents) this.addInvitedStudents(meetingId)
    // },
    // async addInvitedStudents(meetingId) {
    //   await this.$store.dispatch(
    //     "meeting/addInvitedStudents",
    //     this.invitedStudents
    //   );
    // },
    selectMeeting() {
      this.$router.push({ name: "SelectMeeting" });
    },
  },
};
</script>

<style></style>
