<template>
  <div>
    <v-card
      class="mx-auto pa-5"
      style="border-radius: 20px; height:40% max-height:40%"
      outlined
    >
      <div
        class="pl-3 pr-3 color-dark-blue"
        style="display: flex; justify-content: space-between;"
      >
        <h4 class="color-dark-blue">รายชื่อนักศึกษา 43 คน</h4>
        <v-btn
          small
          dark
          color="primary"
          @click="exportScores"
          v-if="showButton"
        >
          <v-icon left>mdi-arrow-up</v-icon>Export file
        </v-btn>
      </div>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">STUDENTID</th>
              <th class="text-left">NAME</th>
              <th class="text-left">SUBJECT</th>
              <th class="text-left">EXAM</th>
              <th class="text-left">SUM</th>
              <th class="text-left">SCORE</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(score, index) in scores" :key="index">
              <td class="color-dark-blue">{{ score.student.studentId }}</td>
              <td class="color-dark-blue">
                {{ score.student.firstName }} {{ score.student.lastName }}
              </td>
              <td class="color-dark-blue">{{ score.subject }}</td>
              <td class="color-dark-blue">{{ score.exam }}</td>
              <td class="color-dark-blue">{{ score.sum }}</td>
              <td class="color-dark-blue">{{ score.score }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </div>
</template>
<script>
import { mapState } from "vuex";
import XLSX from "xlsx";
export default {
  name: "scoreTable",
  computed: {
    ...mapState("score", ["scores"]),
    showButton() {
      return this.scores.length > 0 ? true : false;
    },
  },
  methods: {
    exportScores() {
      let json = this.scores.map((score) => ({
        รหัสนักศึกษา: score.student.studentId,
        "ชื่อ-นามสกุล": `${score.student.firstName} ${score.student.lastName}`,
        ชื่อวิชา: score.subject,
        ชื่อชุดข้อสอบ: score.exam,
        คะแนนทั้งหมด: score.sum,
        คะแนนที่ได้: score.score,
      }));

      const fileName = "test.xlsx";

      /* make the worksheet */
      let ws = XLSX.utils.json_to_sheet(json);

      /* add to workbook */
      let wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "score");

      /* generate an XLSX file */
      XLSX.writeFile(wb, fileName);
    },
  },
};
</script>
