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
              @clickAddQuestion="getAddQuestionClick"
              @clickEditQuestion="getEditQuestionClick"
              :addQuestion="addQuestion"
              :editQuestion="editQuestion"
            />
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
import { mapState } from "vuex";

export default {
  name: "editExam",
  props: ["examId", "subjectId"],
  components: {
    Question,
    ShowEditExam,
    TypeExam,
  },
  data: () => ({
    addQuestion: false,
    editQuestion: false,
  }),
  computed: {
    ...mapState("exam", ["exam"]),
    ...mapState("question", ["questionsInExam"]),
  },
  methods: {
    getAddQuestionClick(event) {
      this.addQuestion = event;
    },
    getEditQuestionClick(event) {
      this.editQuestion = event;
    },
  },
};
</script>
