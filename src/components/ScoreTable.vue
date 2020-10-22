<template>
  <div>
    <v-card
      class="mx-auto pa-5"
      style="border-radius: 20px; height:40% max-height:40%"
      outlined
    >
      <v-data-table :headers="headers" :items="scores">
        <template v-slot:top>
          <v-toolbar flat color="white" class="rounded-xl mx-0">
            <h3 class="color-dark-blue">
              คะแนนสอบนักศึกษา {{ scores.length }} คน
            </h3>
            <v-spacer></v-spacer>
            <v-btn
              small
              dark
              color="primary"
              @click="exportScores"
              v-if="showButton"
            >
              <v-icon left>mdi-arrow-up</v-icon>EXPORT SCORE
            </v-btn>
          </v-toolbar>
        </template>
        <template v-slot:item.studentId="{ item }">
          {{ item.student.studentId }}
        </template>
        <template v-slot:item.fullName="{ item }">
          {{ item.student.firstName }} {{ item.student.lastName }}
        </template>
        <template v-slot:item.semester="{ item }">
          {{ item.term }}/{{ item.year }}
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="showDialog(item)"
            v-if="!item.isCompleted"
          >
            mdi-pencil
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
    <DialogScore
      :dialog="dialog"
      :examId="examId"
      :studentId="studentId"
      :item="score"
      @dialogChange="getDialogChange"
    />
  </div>
</template>
<script>
import { mapState } from "vuex";
import DialogScore from "@/components/DialogScore";
import XLSX from "xlsx";
export default {
  name: "scoreTable",
  components: {
    DialogScore,
  },
  data() {
    return {
      headers: [
        {
          text: "รหัสนักศึกษา",
          align: "start",
          sortable: false,
          value: "studentId",
        },
        { text: "ชื่อ-นามสกุล", value: "fullName", sortable: false },
        { text: "การสอบ", value: "examType", sortable: false },
        { text: "ภาคเรียนที่", value: "semester", sortable: false },
        { text: "คะแนนทั้งหมด", value: "sum", sortable: false },
        { text: "คะแนนที่ได้", value: "score", sortable: false },
        { text: "จัดการ", value: "actions", sortable: false },
      ],
      dialog: false,
      examId: null,
      studentId: null,
      score: {},
    };
  },
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
        รหัสวิชา: score.subjectId,
        ชื่อวิชา: score.subject,
        ชุดข้อสอบ: score.exam,
        การสอบ: score.examType,
        ภาคเรียนที่: `${score.term}/${score.year}`,
        คะแนนทั้งหมด: score.sum,
        คะแนนที่ได้: score.score,
      }));

      const fileName = "report-score.xlsx";

      /* make the worksheet */
      let ws = XLSX.utils.json_to_sheet(json);

      /* add to workbook */
      let wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "score");

      /* generate an XLSX file */
      XLSX.writeFile(wb, fileName);
    },
    getDialogChange(event) {
      this.dialog = event;
    },
    showDialog(item) {
      this.score = item;
      this.dialog = !this.dialog;
      this.studentId = item.student.studentId;
      this.examId = item.examId;
    },
  },
};
</script>
