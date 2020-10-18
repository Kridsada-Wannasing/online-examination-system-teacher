<style lang="scss"></style>
<template id="question">
  <div style="height:80vh; max-height:80vh;">
    <v-row no-gutters class="h-100" align="center">
      <v-col lg="8" md="8" sm="12" xs="12" class="h-100">
        <v-card
          v-if="isYourExam"
          class="mx-auto pa-5"
          style="border-radius: 20px; height:89vh; max-height:89vh; overflow-y:auto"
          outlined
        >
          <div>
            <Question
              :addQuestion="addQuestion"
              :editQuestion="editQuestion"
              @clickAddQuestion="getAddQuestionClick"
              @clickEditQuestion="getEditQuestionClick"
            />
          </div>
        </v-card>
        <v-card
          v-else
          class="d-flex justify-center align-center pa-10 text-center"
          style="border-radius: 20px; height:89vh; max-height:89vh; overflow-y:auto"
          outlined
        >
          <h2 class="grey--text">
            กรุณาคัดลอกชุดข้อสอบนี้ เพื่อสามารถดูหรือแก้ไขชุดข้อสอบ
          </h2>
        </v-card>
      </v-col>
      <v-col lg="4" md="4" sm="12" xs="12" class="h-100">
        <ShowEditExam
          :examId="examId"
          :subjectId="subjectId"
          @isYourExam="checkIsYourExam"
        />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import Question from "@/components/Question";
import ShowEditExam from "@/components/ShowEditExam";

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
    isYourExam: false,
  }),
  methods: {
    getAddQuestionClick(event) {
      this.addQuestion = event;
    },
    getEditQuestionClick(event) {
      this.editQuestion = event;
    },
    checkIsYourExam(event) {
      this.isYourExam = event;
    },
  },
};
</script>
