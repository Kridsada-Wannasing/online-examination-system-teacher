<template>
  <div class="pa-1">
    <div style="display: flex; justify-content: space-between;">
      <h4 class="color-dark-blue">คำถาม</h4>
      <div class="ma-0 pa-0 text-end">
        <h5 class="color-dark-blue mb-3">{{ showNumberOfQuestions }}</h5>
        <DialogQuestion />
      </div>
    </div>
    <v-row>
      <v-col cols="12" v-for="(question, i) in questionsInExam" :key="i">
        <EditQuestion :question="question" :index="i + 1" />
      </v-col>
      <v-col cols="12" v-if="!addQuestion">
        <v-card
          class="mx-auto color-dark-blue pa-4 text-center"
          style="font-size: 12px; border-radius: 20px; min-height: 220px; max-height: 220px;"
          outlined
          @click="addQuestionClick"
        >
          <img
            src="@/assets/icon/plus.svg"
            width="50px"
            style="margin-top: 66px;"
          />
        </v-card>
      </v-col>
      <v-col cols="12" v-else>
        <AddQuestion
          :addQuestion="addQuestion"
          @cancel="addQuestionClick"
          :countQuestions="questionsInExam ? questionsInExam.length : 0"
        />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import AddQuestion from "../components/AddQuestion";
import EditQuestion from "../components/EditQuestion";
import DialogQuestion from "../components/DialogQuestion";
import { mapState } from "vuex";
export default {
  name: "question",
  components: {
    AddQuestion,
    EditQuestion,
    DialogQuestion
  },
  props: ["questions", "addQuestion", "editQuestion"],
  data() {
    return {
      editClick: false,
      questionId: 0
    };
  },
  methods: {
    addQuestionClick() {
      this.$emit("clickAddQuestion", !this.addQuestion);
    },
    editQuestionClick(questionId) {
      this.questionId = questionId;
      this.$emit("clickEditQuestion", !this.editQuestion);
    }
  },
  computed: {
    ...mapState("question", ["questionsInExam"]),
    showNumberOfQuestions() {
      return this.questionsInExam
        ? `${this.questionsInExam.length} ข้อ`
        : "ยังไม่มีคำถาม";
    }
  }
};
</script>
