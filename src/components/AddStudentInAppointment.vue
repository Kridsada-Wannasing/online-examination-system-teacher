<template>
  <div>
    <v-btn
      dark
      color="primary"
      class="mr-4"
      small
      @click.stop="addInvitedStudent"
    >
      <v-icon left small>mdi-account-plus-outline</v-icon>เพิ่มรายชื่อ
    </v-btn>
    <v-dialog v-model="dialog" max-width="900">
      <v-card class="rounded-lg">
        <!-- <v-row>
          <v-col cols="12" sm="6" md="4" lg="4">
            <v-select
              solo
              rounded
              filled
              dense
              :items="faculty"
              label="คณะ"
              hide-details
              @change="getStudentByFaculty"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6" md="4" lg="4">
            <v-select
              solo
              rounded
              filled
              dense
              :items="department"
              label="ภาควิชา"
              hide-details
              @change="getStudentByDepartment"
            ></v-select>
          </v-col>
        </v-row> -->
        <v-row>
          <v-col>
            <v-data-table
              v-model="selectedStudent"
              :headers="headers"
              :items="students"
              class="elevation-0"
              item-key="studentId"
              show-select
            >
              <template v-slot:top>
                <v-toolbar flat color="white" class="rounded-xl mx-0">
                  <h3 class="color-dark-blue">
                    เพิ่มรายชื่อสำหรับนัดหมายการสอบ
                  </h3>
                  <v-spacer></v-spacer>
                  <v-btn
                    small
                    outlined
                    color="success"
                    dark
                    class="mb-2 mr-2"
                    @click="save"
                    >เพิ่มรายชื่อ</v-btn
                  >
                  <v-btn
                    small
                    outlined
                    color="warning"
                    dark
                    class="mb-2 mr-2"
                    @click="cancel"
                    >ยกเลิก</v-btn
                  >
                </v-toolbar>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    meetingId: [Number, String]
  },
  data() {
    return {
      headers: [
        {
          text: "Student ID",
          align: "start",
          sortable: false,
          value: "studentId"
        },
        { text: "Name", value: "firstName", sortable: false },
        { text: "Surname", value: "lastName", sortable: false },
        { text: "Faculty", value: "faculty", sortable: false },
        { text: "Department", value: "department", sortable: false }
      ],
      selectedStudent: [],
      deletedStudent: [],
      dataTable: [],
      dialog: false
      // query: {},
    };
  },
  mounted() {
    this.$store.dispatch("student/getAllStudents");
    this.dialog = this.showDialog;
  },
  computed: {
    ...mapState("student", ["students"])
  },
  methods: {
    // getStudentByFaculty(item) {
    //   this.query.faculty = item;
    // },
    // getStudentByDepartment(item) {
    //   this.query.department = item;
    // },
    deleteItem(item) {
      const index = this.dataTable.indexOf(item);
      this.dataTable.splice(index, 1);
      this.selectedStudent = [];
    },
    async save() {
      if (!this.selectedStudent.length) alert("กรุณาเลือกรายชื่อนักศึกษา");
      const response = await this.$store.dispatch(
        "meeting/createStudentInMeeting",
        this.mapInvitedStudent(this.selectedStudent, this.meetingId)
      );
      alert(`${response.status}: ${response.message}`);
      this.cancel();
    },
    mapInvitedStudent(students, meetingId) {
      return students.map(element => ({
        studentId: element.studentId,
        meetingId: meetingId
      }));
    },
    addInvitedStudent() {
      this.dialog = !this.dialog;
    },
    cancel() {
      this.dataTable = [];
      this.dialog = !this.dialog;
    }
  }
};
</script>

<style></style>
