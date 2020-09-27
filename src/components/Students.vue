<template>
  <div>
    <v-card class="mx-auto pa-5" style="border-radius: 20px;" outlined>
      <h4 class="color-dark-blue pl-3">
        รายชื่อนักศึกษา {{ students.length }} คน
      </h4>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">STUDENTID</th>
              <th class="text-left">NAME</th>
              <th class="text-left">E-MAIL</th>
              <th class="text-left">FACULTY</th>
              <th class="text-left">DEPARTMENT</th>
              <th class="text-left">EDIT</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(student, index) in students" :key="index">
              <td class="color-dark-blue">{{ student.studentId }}</td>
              <td class="color-dark-blue">
                {{ student.firstName }} {{ student.lastName }}
              </td>
              <td class="color-dark-blue">{{ student.email }}</td>
              <td class="color-dark-blue">{{ student.faculty }}</td>
              <td class="color-dark-blue">{{ student.department }}</td>
              <td>
                <v-icon small class="mr-2">mdi-account-outline</v-icon>
                <v-icon small style="color: red;">mdi-close</v-icon>
              </td>
            </tr>
          </tbody>
        </template>
        <!-- <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>-->
      </v-simple-table>
    </v-card>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "students",
  data() {
    return {
      items: [
        {
          no: "101",
          name: "Inverness McKenzie1",
          studentNumber: "110011111-1",
          email: "Dr.Lance@gmail.com",
        },
        {
          no: "102",
          name: "Inverness McKenzie2",
          studentNumber: "110011111-1",
          email: "Dr.Lance@gmail.com",
        },
        {
          no: "103",
          name: "Inverness McKenzie3",
          studentNumber: "110011111-1",
          email: "Dr.Lance@gmail.com",
        },
        {
          no: "104",
          name: "Inverness McKenzie4",
          studentNumber: "110011111-1",
          email: "Dr.Lance@gmail.com",
        },
        {
          no: "105",
          name: "Inverness McKenzie5",
          studentNumber: "110011111-1",
          email: "Dr.Lance@gmail.com",
        },
        {
          no: "106",
          name: "Inverness McKenzie6",
          studentNumber: "110011111-1",
          email: "Dr.Lance@gmail.com",
        },
        {
          no: "104",
          name: "Inverness McKenzie4",
          studentNumber: "110011111-1",
          email: "Dr.Lance@gmail.com",
        },
        {
          no: "105",
          name: "Inverness McKenzie5",
          studentNumber: "110011111-1",
          email: "Dr.Lance@gmail.com",
        },
        {
          no: "106",
          name: "Inverness McKenzie6",
          studentNumber: "110011111-1",
          email: "Dr.Lance@gmail.com",
        },
      ],
    };
  },
  mounted() {
    this.$store.dispatch("student/getAllStudents");
  },
  computed: {
    ...mapState("student", ["students"]),
  },
};
</script>
