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
            @change="showExam"
            label="นัดสอบวิชา"
            hide-details
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="4">
          <span class="color-dark-blue" style="font-size: 12px;"
            >ชุดข้อสอบ</span
          >
          <v-select
            solo
            rounded
            filled
            dense
            :items="exams"
            :item-text="'examName'"
            :item-value="'examId'"
            v-model="examId"
            label="นัดสอบวิชา"
            hide-details
          ></v-select>
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
            label="การสอบ"
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
            label="ภาคเรียนที่"
            hide-details
          ></v-text-field>
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
            label="ปีการศึกษา"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="4">
          <span class="color-dark-blue" style="font-size: 12px;">เริ่มสอบ</span>
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
            filled
            dense
            v-model="password"
            label="รหัสผ่านเข้าสอบ"
            hide-details
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
    AddStudentInAppointment
  },
  props: { status: Boolean },
  data: () => ({
    types: ["กลางภาค", "ปลายภาค", "สอบย่อย"],
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
        value: "studentId"
      },
      { text: "Name", value: "firstName" },
      { text: "Surname", value: "lastName" },
      { text: "Faculty", value: "faculty" },
      { text: "Department", value: "department" },
      { text: "Actions", value: "actions", sortable: false }
    ]
  }),
  computed: {
    ...mapState("subject", ["subjects"]),
    ...mapState("meeting", ["students"]),
    ...mapState("exam", ["exams"])
  },
  methods: {
    async createMeeting() {
      try {
        const response = await this.$store.dispatch("meeting/createMeeting", {
          startExamDate: this.startExamDate,
          endExamDate: this.endExamDate,
          password: this.password,
          isPostpone: false,
          examType: this.examType,
          subjectId: this.subjectId,
          term: this.term,
          year: this.year,
          examId: this.examId
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
    }
  },
  mounted() {
    this.$store.dispatch("subject/getAllSubjects");
  }
};
</script>
