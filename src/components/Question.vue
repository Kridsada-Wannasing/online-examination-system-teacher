<template>
  <div>
    <div style="display: flex; justify-content: space-between;">
      <h4 class="color-dark-blue">คำถาม</h4>
      <h5 class="color-dark-blue">{{ questions.length }} ข้อ</h5>
    </div>
    <v-row>
      <v-col
        cols="12"
        md="4"
        lg="4"
        v-for="(question, i) in questions"
        :key="i"
      >
        <v-card
          class="mx-auto color-dark-blue pa-4"
          style="font-size: 12px; border-radius: 20px; min-height: 220px; max-height: 220px;"
          outlined
          @click="editQuestion(question.questionId)"
          v-if="!editQuestion"
          v-model="editClick"
        >
          <p>{{ question.question }}</p>
          <p class="my-1" v-for="(choice, j) in question.Choices" :key="j">
            {{ choice.choice }}
          </p>
        </v-card>
        <EditQuestion v-else :question="question" :index="i" />
      </v-col>
      <v-col cols="12" md="4" lg="4">
        <v-card
          class="mx-auto color-dark-blue pa-4 text-center"
          style="font-size: 12px; border-radius: 20px; min-height: 220px; max-height: 220px;"
          outlined
          v-if="!addQuestion"
          @click="addQuestionClick"
        >
          <img
            src="@/assets/icon/plus.svg"
            width="50px"
            style="margin-top: 66px;"
          />
        </v-card>
        <AddQuestion
          v-else
          :addQuestion="addQuestion"
          @cancel="addQuestionClick"
        />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import AddQuestion from "../components/AddQuestion";
import EditQuestion from "../components/EditQuestion";
export default {
  name: "question",
  components: {
    AddQuestion,
    EditQuestion,
  },
  props: ["questions", "addQuestion", "editQuestion"],
  data() {
    return {
      editClick: false,
      questionId: 0,
    };
  },
  // Example
  //   data: () => ({
  //   })
  // watch: {
  //   addClick() {
  //     this.$emit("clickAddQuestion", !this.addQuestion);
  //   },
  //   editClick() {
  //     this.$emit("clickEditQuestion", {
  //       editClick: this.editClick,
  //       questionId: this.questionId,
  //     });
  //   },
  // },
  methods: {
    addQuestionClick() {
      this.$emit("clickAddQuestion", !this.addQuestion);
    },
    editQuestionClick(questionId) {
      this.questionId = questionId;
      this.editClick = !this.editClick;
    },
  },
  created() {
    console.log(this.addQuestion);
  },
};
</script>
