<style lang="scss"></style>
<template id="editExam">
  <div class="h-100">
    <v-row no-gutters class="h-100" align="center">
      <v-col lg="9" md="8" sm="12" xs="12" class="h-100 pr-5">
        <v-card
          class="pa-10"
          style="border-radius: 20px; max-height: 700px; overflow: auto;"
        >
          <h3 class="color-dark-blue">แก้ไขชุดข้อสอบ</h3>
          <hr class="mt-3 mb-3" />
          <div class="mb-2">
            <TypeExam :exam="exam" />
          </div>
          <hr class="mt-5 mb-5" />
          <div class="mb-2">
            <Question
              :questions="questionsInExam"
              @clickAddQuestion="showAddQuestion"
            />
          </div>
          <div class="mb-2">
            <AddQuestion v-if="addQuestion" />
          </div>
        </v-card>
      </v-col>
      <v-col lg="3" md="4" sm="12" xs="12" class="h-100 pl-5">
        <ShowEditExam :examId="examId" :subjectId="subjectId" />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import ShowEditExam from "@/components/ShowEditExam";
import TypeExam from "@/components/TypeExam";
import Question from "@/components/Question";
import AddQuestion from "@/components/AddQuestion";
import { mapState } from "vuex";

export default {
  name: "editExam",
  props: ["examId", "subjectId"],
  components: {
    Question,
    ShowEditExam,
    TypeExam,
    AddQuestion,
  },
  data: () => ({
    addQuestion: false,
    // questions: [
    //   {
    //     title:
    //       "1.) Lorem ipsum dolor sit amet, consetetur sedipscing elitr, sed diam noumy",
    //     answer: [
    //       "A.) Lorem ipsum dolor sit amet.",
    //       "B.) Lorem ipsum dolor sit amet.",
    //       "C.) Lorem ipsum dolor sit amet.",
    //       "D.) Lorem ipsum dolor sit amet.",
    //     ],
    //   },
    // ],
  }),
  computed: {
    ...mapState("exam", ["exam"]),
    ...mapState("question", ["questionsInExam"]),
  },
  created() {
    this.$store.dispatch("exam/getExam", {
      examId: this.examId,
      subjectId: this.subjectId,
    });
    this.$store.dispatch("question/getQuestionsInExam", this.examId);
  },
  methods: {
    showAddQuestion(event) {
      console.log(event);
      this.addQuestion = event;
    },
  },
};
</script>
