<template>
  <div>
    <v-card
      v-if="!showStudentTable"
      class="mx-auto pa-6"
      style="border-radius: 20px;"
      outlined
    >
      <h4 class="color-dark-blue">เพิ่มการนัดหมาย</h4>
      <v-row>
        <v-col cols="12" sm="6" md="4" lg="4">
          <span class="color-dark-blue" style="font-size: 12px;">ชื่อวิชา</span>
          <v-select
            solo
            rounded
            filled
            dense
            :items="subjects"
            :item-text="'subjectName'"
            :item-value="'subjectId'"
            v-model="subjectId"
            label="ex. 12345"
            hide-details
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="4">
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
        <v-col cols="12" sm="6" md="4" lg="4">
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
        <v-col cols="12" sm="6" md="4" lg="4">
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
        <v-col cols="12" sm="6" md="4" lg="4">
          <span class="color-dark-blue" style="font-size: 12px;"
            >วันเวลาสอบ</span
          >
          <v-datetime-picker
            label="กดเพื่อเลือกวันเวลาสอบ"
            v-model="examDate"
            :textFieldProps="{ solo: true, dense: true, rounded: true }"
          >
          </v-datetime-picker>
        </v-col>
        <!-- <v-col cols="12" sm="6" md="4" lg="4">
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
        </v-col> -->
      </v-row>
      <v-row>
        <v-spacer></v-spacer>
        <v-col cols="12" sm="6" md="4" lg="4">
          <v-btn
            class="ml-8"
            rounded
            color="#6dc449"
            small
            style="width: 150px"
            dark
            @click="createMeeting"
            >สร้างการนัดหมาย</v-btn
          >
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="4">
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
    <v-card v-else class="mx-auto pa-6" style="border-radius: 20px;" outlined>
      <v-row>
        <v-col>
          <v-data-table
            class="rounded-xl"
            :headers="headers"
            :items="students"
            :items-per-page="5"
          >
            <template v-slot:top>
              <v-toolbar flat color="white" class="rounded-xl mx-0">
                <h3 class="color-dark-blue">
                  รายชื่อนักศึกษา
                </h3>
                <v-spacer></v-spacer>
                <AddStudentInAppointment
                  :showDialog="true"
                  :meetingId="meetingId"
                />
                <v-btn small outlined dark color="red" @click="cancel"
                  >กลับ</v-btn
                >
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon small @click="deleteStudent(item)">mdi-delete</v-icon>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>
<script>
import { mapState } from "vuex";
import AddStudentInAppointment from "@/components/AddStudentInAppointment";
export default {
  name: "addAppointment",
  components: {
    AddStudentInAppointment,
  },
  props: { status: Boolean },
  data: () => ({
    types: ["กลางภาค", "ปลายภาค", "สอบย่อย"],
    subjectId: null,
    examDate: "",
    examType: "",
    term: null,
    year: null,
    menu: null,
    showStudentTable: false,
    meetingId: null,
    // invitedStudent: [],
    headers: [
      {
        text: "Student ID",
        align: "start",
        sortable: false,
        value: "studentId",
      },
      { text: "Name", value: "firstName" },
      { text: "Surname", value: "lastName" },
      { text: "Faculty", value: "faculty" },
      { text: "Department", value: "department" },
      { text: "Actions", value: "actions", sortable: false },
    ],
  }),
  watch: {
    examDate() {
      console.log(this.examDate);
    },
    subjectId() {
      console.log(this.subjectId);
    },
  },
  computed: {
    ...mapState("subject", ["subjects"]),
    ...mapState("meeting", ["students"]),
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

      // if (this.invitedStudent.length > 0) {
      //   this.createStudentInMeeting(
      //     this.mapStudent(this.invitedStudent, response.data.meetingId)
      //   );
      // }
      alert(`${response.status}: ${response.message}`);
      // this.$router.push({
      //   name: "ShowAppointment",
      //   params: { meetingId: response.newMeeting.meetingId },
      // });
      this.showStudentTable = true;
      this.meetingId = response.newMeeting.meetingId;
      // this.getAllStudentInMeeting(response.newMeeting.meetingId);
    },
    // getAllStudentInMeeting(meetingId) {
    //   this.$store.dispatch("meeting/getAllStudentInMeeting", meetingId);
    // },
    // createStudentInMeeting(students) {
    //   await this.$store.dispatch("meeting/createStudentInMeeting", students);
    // },
    cancel() {
      this.$emit("statusChange", !this.status);
    },
    // mapStudent(student, meetingId) {
    //   return student.map((element) => ({
    //     studentId: element,
    //     meetingId: meetingId,
    //   }));
    // },
  },
  mounted() {
    this.$store.dispatch("subject/getAllSubjects");
  },
};
</script>
