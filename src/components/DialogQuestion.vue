<template>
  <div>
    <v-btn
      color="primary"
      class="text-none"
      small
      outlined
      depressed
      @click.stop="showDialog"
    >
      <v-icon left v-text="'mdi-plus'" small class="color-blue"></v-icon
      >เพิ่มคำถามที่มีอยู่
    </v-btn>
    <v-dialog v-model="dialog" max-width="1100">
      <v-card class="px-4">
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
              @change="getExams"
              label="เลือกวิชา"
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
              @change="selectFromExam"
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
              @change="selectFromQuestionType"
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
              @change="selectFromLevel"
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
              @change="selectFromTag"
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
          show-expand
          show-select
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
          <template v-slot:item.exam>
            <p>{{ showExam }}</p>
          </template>
          <template v-slot:item.subject>
            <p>{{ showSubject }}</p>
          </template>
          <template v-slot:item.QuestionTags="{ item }">
            <p v-for="(tag, index) in item.QuestionTags" :key="index">
              {{ tag.Tag.tagName }}
            </p>
          </template>
          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length">
              <div class="row">
                <div class="col">
                  <div>
                    <h3>{{ item.question }}</h3>
                  </div>
                  <div v-if="item.Choices">
                    <p v-for="choice in item.Choices" :key="choice.order">
                      {{ choice.choice }}
                    </p>
                  </div>
                </div>
              </div>
            </td>
          </template>
        </v-data-table>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import qs from "qs";
import { mapState } from "vuex";
export default {
  props: {
    examId: [Number, String]
  },
  data() {
    return {
      headers: [
        { text: "ชื่อวิชา", align: "start", value: "subject", sortable: false },
        { text: "ชุดข้อสอบ", value: "exam", sortable: false },
        { text: "ประเภทคำถาม", value: "questionType", sortable: false },
        { text: "ระดับความยาก", value: "level", sortable: false },
        { text: "แท็ก", value: "QuestionTags", sortable: false },
        {
          text: "รายละเอียดคำถาม",
          value: "data-table-expand",
          sortable: false
        },
        { text: "", value: "data-table-select", sortable: false }
      ],
      types: ["ปรนัย", "อัตนัย"],
      level: [1, 2, 3, 4, 5],
      dialog: false,
      expanded: [],
      query: {},
      tagsOfQuestion: [],
      questionLevel: null,
      questionType: "",
      exam: null,
      subject: null,
      questionsInExam: []
    };
  },
  computed: {
    ...mapState("question", ["questions"]),
    ...mapState("exam", ["exams"]),
    ...mapState("tag", ["tags"]),
    ...mapState("subject", ["subjects"]),
    showExam() {
      let exam = this.exams.find(exam => exam.examId == this.exam);
      return exam.examName;
    },
    showSubject() {
      let subject = this.subjects.find(
        subject => subject.subjectId == this.subject
      );
      return subject.subjectName;
    }
  },
  methods: {
    getExams(subjectId) {
      this.$store.dispatch("exam/getAllExams", { subjectId: subjectId });
    },
    selectFromExam(examId) {
      this.exam = examId;
      this.search();
    },
    selectFromTag() {
      this.query.tagId = this.tagsOfQuestion;
      this.search();
    },
    selectFromLevel(level) {
      this.query.level = level;
      this.search();
    },
    selectFromQuestionType(questionType) {
      this.query.questionType = questionType;
      this.search();
    },
    search() {
      console.log(this.exam);
      this.$store.dispatch("question/searchQuestions", {
        examId: this.exam,
        queryString: qs.stringify(this.query)
      });
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
      return this.questionsInExam.map(question => ({
        questionId: question.questionId,
        examId: this.$route.params.examId
      }));
    },
    async showDialog() {
      await this.$store.dispatch("subject/getAllSubjects");
      await this.$store.dispatch("tag/getAllTags");
      this.dialog = !this.dialog;
    },
    cancel() {
      this.dialog = !this.dialog;
    }
  }
};
</script>

<style></style>
