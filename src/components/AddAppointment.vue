<template>
  <div>
    <v-card class="mx-auto pa-10" style="border-radius: 20px;" outlined>
      <h4 class="color-dark-blue">เพิ่มการนัดหมาย</h4>
      <v-row>
        <v-col cols="12" sm="6" md="3" lg="3">
          <span class="color-dark-blue" style="font-size: 12px;">ชื่อวิชา</span>
          <v-select
            solo
            rounded
            filled
            dense
            :items="subjects"
            :item-text="'subjectName'"
            :item-value="'subjectId'"
            label="ex. 12345"
            hide-details
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6" md="3" lg="3">
          <span class="color-dark-blue" style="font-size: 12px;"
            >ปีการศึกษา</span
          >
          <v-text-field
            solo
            rounded
            filled
            dense
            v-model="year"
            label="ex. 12345"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3" lg="3">
          <span class="color-dark-blue" style="font-size: 12px;">การสอบ</span>
          <v-select
            solo
            rounded
            filled
            dense
            :items="types"
            v-model="examType"
            label="ex.123456"
            hide-details
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6" md="3" lg="3">
          <span class="color-dark-blue" style="font-size: 12px;"
            >ภาคการศึกษา</span
          >
          <v-text-field
            solo
            rounded
            filled
            dense
            v-model="term"
            label="ex. 123456"
            hide-details
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" md="3" lg="3">
          <span class="color-dark-blue" style="font-size: 12px;"
            >วันเวลาสอบ</span
          >
          <v-select
            solo
            rounded
            filled
            dense
            v-model="examDate"
            label="ex. 12345"
            hide-details
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6" md="3" lg="3">
          <span class="color-dark-blue" style="font-size: 12px;"
            >กลุ่มเรียน</span
          >
          <v-select
            solo
            rounded
            filled
            dense
            label="ex. 12345"
            hide-details
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" md="3" lg="3">
          <v-btn
            rounded
            color="#6dc449"
            small
            style="width: 150px"
            dark
            @click="createMeeting"
            >สร้างชุดข้อสอบ</v-btn
          >
        </v-col>
        <v-col cols="12" sm="6" md="3" lg="3">
          <v-btn
            class="ml-4"
            outlined
            rounded
            color="red"
            small
            style="width: 150px"
            dark
            @click="cancel"
            >ยกเลิก</v-btn
          >
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>
<script>
// import ListCode from "@/components/ListCode";
import { mapState } from "vuex";
export default {
  name: "addAppointment",
  props: ["status"],
  components: {
    // ListCode,
  },
  data: () => ({
    types: ["กลางภาค", "ปลายภาค", "สอบย่อย"],
    subjectId: null,
    examDate: "",
    examType: "",
    term: null,
    year: null,
    invitedStudent: [],
  }),
  computed: {
    ...mapState("subject", ["subjects"]),
    ...mapState("student", ["students"]),
  },
  methods: {
    async createMeeting() {
      const response = await this.$store.dispatch("meeting/createMeeting", {
        examDate: this.examDate,
        examType: this.examType,
        subjectId: this.subjectId,
        term: this.term,
        year: this.year,
      });

      if (this.invitedStudent) {
        this.addInvitedStudent(
          this.mapInvitedStudent(this.invitedStudent, response.data.meetingId)
        );
      }
      console.log(response);
    },
    async addInvitedStudent(invitedStudent) {
      if (!invitedStudent) invitedStudent = this.invitedStudent;
      const response = await this.$store.dispatch(
        "meeting/addInvitedStudent",
        invitedStudent
      );

      console.log(response);
      // this.invitedStudent = response;
    },
    cancel() {
      this.$emit("statusChange", !this.status);
    },
    mapInvitedStudent(invitedStudent, meetingId) {
      return invitedStudent.map((element) => ({
        studentId: element,
        meetingId: meetingId,
      }));
    },
  },
};
</script>
