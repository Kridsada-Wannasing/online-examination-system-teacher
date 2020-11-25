<template>
  <div>
    <v-card
      v-if="!showStudentTable"
      class="mx-auto pa-6"
      style="border-radius: 20px;"
      outlined
    >
      <h4 class="color-dark-blue">เพิ่มการนัดหมาย</h4>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row>
          <v-col cols="12" sm="6" md="4" lg="4">
            <span class="color-dark-blue" style="font-size: 12px;"
              >ชื่อวิชา</span
            >
            <v-select
              solo
              rounded
              dense
              :items="subjects"
              :item-text="'subjectName'"
              :item-value="'subjectId'"
              v-model="subjectId"
              @change="showExam"
              label="เลือกวิชา"
              :rules="[(v) => !!v || 'กรุณาเลือกวิชา']"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6" md="4" lg="4">
            <span class="color-dark-blue" style="font-size: 12px;"
              >ชุดข้อสอบ</span
            >
            <v-select
              solo
              rounded
              dense
              :items="exams"
              :item-text="'examName'"
              :item-value="'examId'"
              v-model="examId"
              :rules="[(v) => !!v || 'กรุณาเลือกชุดข้อสอบ']"
              label="เลือกชุดข้อสอบ"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6" md="4" lg="4">
            <span class="color-dark-blue" style="font-size: 12px;">การสอบ</span>
            <v-select
              solo
              rounded
              dense
              :items="types"
              v-model="examType"
              label="การสอบ"
              :rules="[(v) => !!v || 'กรุณาเลือกประเภทการสอบ']"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6" md="4" lg="4">
            <span class="color-dark-blue" style="font-size: 12px;"
              >ภาคการศึกษา</span
            >
            <v-select
              solo
              rounded
              dense
              v-model="term"
              :items="terms"
              placeholder="เลือกภาคเรียน"
              label="ภาคเรียนที่"
              :rules="[(v) => !!v || 'กรุณาเลือกภาคเรียน']"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6" md="4" lg="4">
            <span class="color-dark-blue" style="font-size: 12px;"
              >ปีการศึกษา</span
            >
            <v-select
              solo
              rounded
              dense
              :items="years"
              v-model="year"
              label="ปีการศึกษา"
              placeholder="เลือกปีการศึกษา"
              :rules="[(v) => !!v || 'กรุณาเลือกปีการศึกษา']"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6" md="4" lg="4">
            <span class="color-dark-blue" style="font-size: 12px;"
              >เริ่มสอบ</span
            >
            <v-datetime-picker
              label="กำหนดเวลาเริ่มสอบ"
              v-model="startExamDate"
              :textFieldProps="{ solo: true, dense: true, rounded: true }"
            >
              <template slot="dateIcon">
                <v-icon>Date</v-icon>
              </template>
              <template slot="timeIcon">
                <v-icon>Time</v-icon>
              </template>
            </v-datetime-picker>
          </v-col>
          <v-col cols="12" sm="6" md="4" lg="4">
            <span class="color-dark-blue" style="font-size: 12px;"
              >หมดเวลาสอบ</span
            >
            <v-datetime-picker
              label="กำหนดเวลาสิ้นสุดการสอบ"
              v-model="endExamDate"
              :textFieldProps="{ solo: true, dense: true, rounded: true }"
            >
              <template slot="dateIcon">
                <v-icon>Date</v-icon>
              </template>
              <template slot="timeIcon">
                <v-icon>Time</v-icon>
              </template>
            </v-datetime-picker>
          </v-col>
          <v-col cols="12" sm="6" md="4" lg="4">
            <span class="color-dark-blue" style="font-size: 12px;"
              >รหัสผ่านเข้าสอบ</span
            >
            <v-text-field
              solo
              rounded
              dense
              v-model="password"
              label="รหัสผ่านเข้าสอบ"
              :rules="[
                (v) => !!v || 'กรุณาตั้งหรัสเข้าสอบ',
                (v) =>
                  (v && v.length <= 10) || 'ใส่รหัสผ่านได้ไม่เกิน 10 ตัวอักษร',
              ]"
            ></v-text-field>
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
              :disabled="!valid"
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
      </v-form>
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
import range from "lodash/range";
import AddStudentInAppointment from "@/components/AddStudentInAppointment";
export default {
  name: "addAppointment",
  components: {
    AddStudentInAppointment,
  },
  props: { status: Boolean },
  data: () => ({
    types: ["กลางภาค", "ปลายภาค", "สอบย่อย"],
    terms: [1, 2, 3],
    years: [],
    valid: true,
    subjectId: null,
    startExamDate: "",
    endExamDate: "",
    examType: "",
    examId: null,
    term: null,
    year: null,
    menu: null,
    showStudentTable: false,
    meetingId: null,
    password: "",
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
  computed: {
    ...mapState("subject", ["subjects"]),
    ...mapState("meeting", ["students"]),
    ...mapState("exam", ["exams"]),
  },
  methods: {
    async createMeeting() {
      try {
        // if (!this.subjectId) {
        //   return alert("กรุณาเลือกวิชาสอบ");
        // }

        // if (!this.examId) {
        //   return alert("กรุณาเลือกชุดข้อสอบ");
        // }

        // if (!this.examType) {
        //   return alert("กรุณาเลือกประเภทการสอบ");
        // }

        // if (!this.term) {
        //   return alert("กรุณาระบุภาคการศึกษา");
        // }

        // if (!this.year) {
        //   return alert("กรุณาระบุปีการศึกษา");
        // }

        // if (!this.startExamDate) {
        //   return alert("กรุณาเลือกเวลาเริ่มสอบ");
        // }

        // if (!this.endExamDate) {
        //   return alert("กรุณาเลือกเวลาสิ้นสุดการสอบ");
        // }

        // if (!this.password) {
        //   return alert("กรุณาระบุรหัสเข้าสอบ");
        // }

        const response = await this.$store.dispatch("meeting/createMeeting", {
          startExamDate: this.startExamDate,
          endExamDate: this.endExamDate,
          password: this.password,
          isPostpone: false,
          examType: this.examType,
          subjectId: this.subjectId,
          term: this.term,
          year: this.year,
          examId: this.examId,
        });

        alert(`${response.status}: ${response.message}`);
        this.showStudentTable = true;
        this.meetingId = response.newMeeting.meetingId;
      } catch (error) {
        alert(error);
      }
    },
    cancel() {
      this.$emit("statusChange", !this.status);
    },
    showExam(subjectId) {
      this.$store.dispatch("exam/getAllExams", { subjectId });
    },
  },
  mounted() {
    this.$store.dispatch("subject/getAllSubjects");
    const currentYear = new Date().getFullYear() + 544;
    const startYear = currentYear - 20;

    this.years = range(startYear, currentYear);
  },
};
</script>
