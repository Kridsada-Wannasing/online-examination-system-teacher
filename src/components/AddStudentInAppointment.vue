<template>
  <div>
    <v-btn
      color="primary"
      class="text-none"
      small
      outlined
      depressed
      @click.stop="addInvitedStudent"
    >
      <v-icon left v-text="'mdi-account-plus'" small class="color-blue"></v-icon
      >เพิ่มรายชื่อ
    </v-btn>
    <v-dialog v-model="dialog" max-width="900">
      <v-card>
        <v-row>
          <v-col>
            <h3>เพิ่มรายชื่อสำหรับนัดหมายการสอบ</h3>
          </v-col>
          <v-spacer></v-spacer>
          <v-col>
            <v-btn
              small
              outlined
              color="success"
              dark
              class="mb-2 mr-2"
              @click="save"
              >Add student</v-btn
            >
          </v-col>
          <v-col
            ><v-btn
              small
              outlined
              color="warning"
              dark
              class="mb-2 mr-2"
              @click="cancel"
              >Cancel</v-btn
            ></v-col
          >
        </v-row>
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
              sort-by="calories"
              class="elevation-0"
              item-key="studentId"
              show-select
            >
            </v-data-table>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
      ],
      selectedStudent: [],
      dataTable: [],
      dialog: false,
      query: {},
    };
  },
  mounted() {
    this.$store.dispatch("student/getAllStudents");
  },
  computed: {
    ...mapState("student", ["students"]),
  },
  methods: {
    getStudentByFaculty(item) {
      this.query.faculty = item;
    },
    getStudentByDepartment(item) {
      this.query.department = item;
    },
    deleteItem(item) {
      const index = this.dataTable.indexOf(item);
      this.dataTable.splice(index, 1);
    },
    async save() {
      const response = await this.$store.dispatch(
        "student/registerStudents",
        this.dataTable
      );
      alert(`${response.status}: ${response.message}`);
      this.cancel();
    },
    cancel() {
      this.dataTable = [];
      this.selectedFile = null;
      this.dialog = !this.dialog;
    },
  },
};
</script>

<style></style>
