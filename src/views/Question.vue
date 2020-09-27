<style lang="scss"></style>
<template id="question">
  <div class="h-100">
    <v-row no-gutters class="h-100" align="center">
      <v-col lg="8" md="8" sm="12" xs="12" class="h-100">
        <v-card
          class="mx-auto pa-5 h-100"
          style="border-radius: 20px;"
          outlined
        >
          <Question
            :questions="questionsInExam"
            :addQuestion="addQuestion"
            :editQuestion="editQuestion"
          />
        </v-card>
      </v-col>
      <v-col lg="4" md="4" sm="12" xs="12" class="h-100">
        <ShowEditExam :examId="examId" :subjectId="subjectId" />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import Question from "@/components/Question";
import ShowEditExam from "@/components/ShowEditExam";
import { mapState } from "vuex";

export default {
  name: "question",
  props: ["examId", "subjectId"],
  components: {
    Question,
    ShowEditExam,
  },
  data: () => ({
    addQuestion: false,
    editQuestion: false,
  }),
  created() {
    this.$store.dispatch("question/getQuestionsInExam", this.examId);
  },
  computed: {
    ...mapState("question", ["questionsInExam"]),
  },
  methods: {
    getAddQuestionClick(event) {
      console.log(event);
      this.addQuestion = event;
    },
    getCancelEditQuestion(event) {
      console.log(event);
      this.editQuestion = event;
    },
  },
};
</script>
