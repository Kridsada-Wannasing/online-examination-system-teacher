<template>
  <div>
    <v-btn
      color="primary"
      class="text-none"
      small
      outlined
      depressed
      @click.stop="dialog = !dialog"
    >
      <v-icon left v-text="'mdi-paperclip'" small class="color-blue"></v-icon
      >เพิ่มคำถามที่มีอยู่
    </v-btn>
    <v-dialog v-model="dialog" max-width="900">
      <v-card>
        <v-card-title>คำถามทั้งหมด</v-card-title>
        <v-row>
          <v-col>
            <v-select
              solo
              rounded
              filled
              dense
              :items="subjects"
              :item-text="'subjectName'"
              :item-value="'subjectId'"
              v-model="subject"
              label="ex. 12345"
              hide-details
            ></v-select>
          </v-col>
          <v-col>
            <v-select
              solo
              rounded
              filled
              dense
              :items="exams"
              :item-text="'examName'"
              :item-value="'examId'"
              v-model="exam"
              label="ชุดข้อสอบ"
              hide-details
            ></v-select>
          </v-col>
          <v-col>
            <v-select
              solo
              rounded
              filled
              dense
              :items="types"
              v-model="questionType"
              label="ประเภทคำถาม"
              hide-details
            ></v-select>
          </v-col>
          <v-col>
            <v-select
              solo
              rounded
              filled
              dense
              :items="level"
              v-model="questionLevel"
              label="ระดับความยาก"
              hide-details
            ></v-select>
          </v-col>
          <v-col>
            <v-select
              solo
              rounded
              dense
              filled
              multiple
              :items="tags"
              :item-text="'tagName'"
              :item-value="'tagId'"
              v-model="tagsOfQuestion"
              label="Tag"
              hide-details
            >
            </v-select>
          </v-col>
        </v-row>
        <v-data-table
          :headers="headers"
          :items="questions"
          single-expand
          :expanded.sync="expanded"
          item-key="questionId"
          v-model="questionsInExam"
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
              <v-card-subtitle v-if="item.questionType == 'ปรนัย'">
                <div v-for="(choice, index) in item.Choices" :key="index">
                  <p>{{ choice.choice }}</p>
                </div>
              </v-card-subtitle>
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
  props: {
    examId: [Number, String],
  },
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
      dialog: false,
      query: {},
      tagsOfQuestion: [],
      questionLevel: null,
      questionType: "",
      exam: null,
      subject: null,
      questionsInExam: [],
    };
  },
  computed: {
    ...mapState("question", ["questions"]),
    ...mapState("exam", ["exams"]),
    ...mapState("subject", ["subjects"]),
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
        "question/importQuestionsInExam",
        this.mapQuestionIdAndExamId()
      );
      alert(`${response.status}: ${response.message}`);
      this.cancel();
    },
    mapQuestionIdAndExamId() {
      return this.questionsInExam.map((question) => ({
        questionId: question.questionId,
        examId: this.examId,
      }));
    },
    cancel() {
      this.dialog = !this.dialog;
    },
  },
};
</script>

<style></style>
