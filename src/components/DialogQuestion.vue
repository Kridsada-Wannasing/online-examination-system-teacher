<template>
  <div>
    <v-btn
      color="primary"
      class="text-none"
      small
      outlined
      depressed
      @click.stop="dialog"
    >
      <v-icon left v-text="'mdi-paperclip'" small class="color-blue"></v-icon
      >เพิ่มคำถามที่มีอยู่
    </v-btn>
    <v-dialog v-model="dialog" max-width="900">
      <v-card>
        <v-card-title>คำถามทั้งหมด</v-card-title>
        <v-row>
          <v-col>ชุดข้อสอบ </v-col>
          <v-col>
            ประเภทคำถาม
          </v-col>
          <v-col>
            ระดับความยาก
          </v-col>
          <v-col>
            แท็ก
          </v-col>
        </v-row>
        <v-data-table
          :headers="headers"
          :items="questions"
          single-expand
          :expanded.sync="expanded"
          item-key="questionId"
          class="elevation-0"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-spacer></v-spacer>
              <v-btn small color="success" dark class="mb-2 mr-2" @click="save"
                >บันทึก</v-btn
              >
              <v-btn small outlined color="warning" class="mb-2" @click="cancel"
                >ยกเลิก</v-btn
              >
            </v-toolbar>
          </template>
          <template v-slot:expanded-item="{ item }">
            <v-card>
              <v-card-title class="headline">{{ item.question }}</v-card-title>
            </v-card>
          </template>
        </v-data-table>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      headers: [
        {
          text: "รหัสประจำคำถาม",
          align: "start",
          sortable: false,
          value: "questionId",
        },
        { text: "ประเภทคำถาม", value: "questionType" },
        { text: "ระดับความยาก", value: "level" },
        { text: "แท็ก", value: "tag" },
        { text: "ชุดข้อสอบ", value: "exam" },
      ],
      expanded: [],
      singleExpand: true,
      dialog: false,
      query: {},
    };
  },
  computed: {
    ...mapState("question", ["questions"]),
  },
  methods: {
    selectFromExam(examId) {
      this.query.examId = examId;
    },
    selectFromTag(tagId) {
      this.query.tagId = tagId;
    },
    selectFromLevel(level) {
      this.query.level = level;
    },
    selectFromQuestionType(questionType) {
      this.query.questionType = questionType;
    },
    search() {
      this.$store.dispatch("question/getAllQuestions", this.query);
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
