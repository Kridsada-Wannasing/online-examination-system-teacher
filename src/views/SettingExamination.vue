<template>
  <div class="h-100">
    <v-row class="h-100 ma-0 pa-0">
      <v-col cols="9" class="ma-0 pa-0 mt-0 pt-0">
        <v-row>
          <v-col class="mt-0 pt-0">
            <h1 class="white--text">ห้องสอบ</h1>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="ma-0 pa-0">
            <v-card class="mx-5 px-4 py-2 rounded-xl" height="500">
              <div
                style="display: flex; justify-content: space-between; height: 10%; min-height: 10%; max-height: 10%;"
              >
                <h3 class="color-dark-blue ml-5 mt-3">การนัดหมาย</h3>
              </div>
              <div
                style="height: 40%; min-height: 40%; max-height: 40%; overflow: auto;"
              >
                <v-row no-gutters>
                  <v-col
                    class="h-100 ma-0 pa-0"
                    cols="12"
                    lg="4"
                    md="6"
                    sm="6"
                    xs="12"
                  >
                    <Folder class="pa-6" color="green" :meeting="meeting" />
                  </v-col>
                </v-row>
              </div>
              <div
                style="display: flex; justify-content: space-between; height: 10%; min-height: 10%; max-height: 10%;"
              >
                <h3 class="color-dark-blue ml-5 mt-5">ตั้งค่าห้องสอบ</h3>
              </div>
              <div>
                <v-divider class="ma-5"></v-divider>
              </div>
              <div
                style="height: 50%; min-height: 50%; max-height: 50%; overflow: auto;"
              >
                <v-row no-gutters>
                  <v-col
                    class="mb-2 pa-2"
                    cols="12"
                    lg="3"
                    md="6"
                    sm="6"
                    xs="12"
                  >
                    <span class="color-dark-blue" style="font-size: 12px;"
                      >ชุดข้อสอบ</span
                    >
                    <v-select
                      label="เลือกชุดข้อสอบ"
                      :items="exams"
                      item-text="examName"
                      item-value="examId"
                      v-model="examinationData.examId"
                      rounded
                      dense
                      solo
                    ></v-select>
                  </v-col>
                  <v-col
                    class="mb-2 pa-2"
                    cols="12"
                    lg="3"
                    md="6"
                    sm="6"
                    xs="12"
                  >
                    <span class="color-dark-blue" style="font-size: 12px;"
                      >ตั้งรหัสผ่าน</span
                    >
                    <v-text-field
                      label="รหัสผ่าน"
                      rounded
                      dense
                      solo
                      v-model="examinationData.password"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    class="mb-2 pa-2"
                    cols="12"
                    lg="3"
                    md="6"
                    sm="6"
                    xs="12"
                  >
                    <span class="color-dark-blue" style="font-size: 12px;"
                      >ตั้งเวลาสอบ</span
                    >
                    <v-datetime-picker
                      label="เริ่มสอบ"
                      v-model="examinationData.startDate"
                      :textFieldProps="{
                        solo: true,
                        dense: true,
                        rounded: true
                      }"
                    >
                      <template slot="dateIcon">
                        <v-icon>Date</v-icon>
                      </template>
                      <template slot="timeIcon">
                        <v-icon>Time</v-icon>
                      </template>
                    </v-datetime-picker>
                  </v-col>
                  <v-col
                    class="mb-2 pa-2"
                    cols="12"
                    lg="3"
                    md="6"
                    sm="6"
                    xs="12"
                  >
                    <span class="color-dark-blue" style="font-size: 12px;"
                      >หมดเวลาสอบ</span
                    >
                    <v-datetime-picker
                      label="หมดเวลาสอบ"
                      v-model="examinationData.endDate"
                      :textFieldProps="{
                        solo: true,
                        dense: true,
                        rounded: true
                      }"
                    >
                    </v-datetime-picker>
                  </v-col>
                </v-row>
                <v-card-actions class="d-flex justify-end mb-3">
                  <v-btn
                    color="success"
                    rounded
                    dark
                    @click="createExamination"
                  >
                    สร้างห้องสอบ
                  </v-btn>
                  <v-btn
                    color="red"
                    rounded
                    outlined
                    :to="{ name: 'Examination' }"
                  >
                    ยกเลิก
                  </v-btn>
                </v-card-actions>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="3" class="h-100 ma-0 pa-0 pl-5">
        <ProfileMenu />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ProfileMenu from "@/components/ProfileMenu";
import Folder from "@/components/Folder";
import { mapState } from "vuex";
export default {
  components: {
    ProfileMenu,
    Folder
  },
  data() {
    return {
      examinationData: {
        examId: null,
        password: "",
        startDate: "",
        endDate: ""
      },
      menu: false
    };
  },
  methods: {
    async createExamination() {
      const response = await this.$store.dispatch(
        "examination/createExamination",
        {
          examId: this.examinationData.examId,
          password: this.examinationData.password,
          startDate: this.examinationData.startDate,
          endDate: this.examinationData.endDate,
          meetingId: this.$route.params.meetingId
        }
      );

      alert(`${response.status}: ${response.message}`);
      this.$router.push({ name: "Examination" });
    },
    async updateExamination() {
      const response = await this.$store.dispatch(
        "examination/updateExamination",
        {
          examId: this.examinationData.examId,
          password: this.examinationData.password,
          startDate: this.examinationData.startDate,
          endDate: this.examinationData.endDate
        }
      );

      alert(`${response.status}: ${response.message}`);
      this.$router.push({ name: "Examination" });
    }
  },
  computed: {
    ...mapState("meeting", ["meeting"]),
    ...mapState("exam", ["exams"]),
    ...mapState("examination", ["examination"]),
    checkExamination() {
      if (!this.examination || Object.keys(this.examination).length > 0)
        return true;
      else return false;
    }
  },
  mounted() {
    if (!this.examination || Object.keys(this.examination).length > 0)
      this.examinationData = this.examination;

    this.$store
      .dispatch("meeting/getMeeting", this.$route.params.meetingId)
      .then(() => {
        this.examinationData.startDate = new Date(this.meeting.examDate);
        this.examinationData.endDate = new Date(this.meeting.examDate);

        this.$store.dispatch("exam/getAllExams", {
          subjectId: this.meeting.subjectId
        });
      })
      .catch(error => alert(error));
  }
};
</script>

<style></style>
