<template>
  <div>
    <v-card class="mx-auto pa-5" style="border-radius: 20px;" outlined>
      <div
        class="pl-3 pr-3 color-dark-blue"
        style="display: flex; justify-content: space-between;"
      >
        <h4 class="color-dark-blue">รายชื่อนักศึกษา 43 คน</h4>
        <v-btn small outlined color="primary" to="/class">
          <v-icon left>mdi-arrow-up</v-icon>Export file
        </v-btn>
      </div>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">NO</th>
              <th class="text-left">NAME</th>
              <th class="text-left">STUDENT NUMBER</th>
              <th class="text-left">E-MAIL</th>
              <th class="text-left">SCORE</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item.no">
              <td class="color-dark-blue">{{ item.no }}</td>
              <td class="color-dark-blue">{{ item.name }}</td>
              <td class="color-dark-blue">{{ item.studentNumber }}</td>
              <td class="color-dark-blue">{{ item.email }}</td>
              <td class="color-dark-blue">{{ item.score }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </div>
</template>
<script>
export default {
  name: "scoreTable",
  data() {
    return {
      items: [
        {
          no: "101",
          name: "Inverness McKenzie1",
          studentNumber: "110011111-1",
          email: "Dr.Lance@gmail.com",
          score: "20"
        },
        {
          no: "102",
          name: "Inverness McKenzie2",
          studentNumber: "110011111-1",
          email: "Dr.Lance@gmail.com",
          score: "50"
        },
        {
          no: "103",
          name: "Inverness McKenzie3",
          studentNumber: "110011111-1",
          email: "Dr.Lance@gmail.com",
          score: "20"
        },
        {
          no: "104",
          name: "Inverness McKenzie4",
          studentNumber: "110011111-1",
          email: "Dr.Lance@gmail.com",
          score: "20"
        },
        {
          no: "105",
          name: "Inverness McKenzie5",
          studentNumber: "110011111-1",
          email: "Dr.Lance@gmail.com",
          score: "20"
        },
        {
          no: "106",
          name: "Inverness McKenzie6",
          studentNumber: "110011111-1",
          email: "Dr.Lance@gmail.com",
          score: "20"
        }
      ]
    };
  }
};
</script>
