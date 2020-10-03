<template>
  <div>
    <v-data-table
      class="rounded-xl"
      :headers="headers"
      :items="students"
      :items-per-page="5"
    >
      <template v-slot:top>
        <v-toolbar flat color="white" class="rounded-xl">
          <h3 class="color-dark-blue pl-3">
            รายชื่อนักศึกษา {{ students.length }} คน
          </h3>
          <v-spacer></v-spacer>
          <DialogAddStudentTable />
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small @click="deleteStudent(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { mapState } from "vuex";
import DialogAddStudentTable from "./DialogAddStudentTable";
export default {
  name: "students",
  components: {
    DialogAddStudentTable,
  },
  data() {
    return {
      headers: [
        {
          text: "Student ID",
          align: "start",
          sortable: false,
          value: "studentId",
        },
        { text: "Name", value: "firstName", sortable: false },
        { text: "Surname", value: "lastName", sortable: false },
        { text: "Faculty", value: "faculty", sortable: false },
        { text: "Department", value: "department", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  mounted() {
    this.$store.dispatch("student/getAllStudents");
  },
  computed: {
    ...mapState("student", ["students"]),
  },
  methods: {
    deleteStudent(item) {
      console.log(item);
      // this.$store.dispatch("student/deleteStudent", item);
    },
  },
};
</script>
