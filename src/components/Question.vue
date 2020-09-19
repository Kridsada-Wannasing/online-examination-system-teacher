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
        >
          <p>{{ question.question }}</p>
          <p class="my-1" v-for="(choice, j) in question.Choices" :key="j">
            {{ choice.choice }}
          </p>
        </v-card>
      </v-col>
      <v-col cols="12" md="4" lg="4">
        <v-card
          class="mx-auto color-dark-blue pa-4 text-center"
          style="font-size: 12px; border-radius: 20px; min-height: 220px; max-height: 220px;"
          outlined
          @click="addQuestionClick"
          v-model="click"
        >
          <img
            src="@/assets/icon/plus.svg"
            width="50px"
            style="margin-top: 66px;"
          />
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  name: "question",
  props: ["questions"],
  data() {
    return {
      click: false,
    };
  },
  // Example
  //   data: () => ({
  //     questions: [
  //       {
  //         title:
  //           "1.) Lorem ipsum dolor sit amet, consetetur sedipscing elitr, sed diam noumy",
  //         answer: [
  //           "A.) Lorem ipsum dolor sit amet.",
  //           "B.) Lorem ipsum dolor sit amet.",
  //           "C.) Lorem ipsum dolor sit amet.",
  //           "D.) Lorem ipsum dolor sit amet."
  //         ]
  //       }
  //     ]
  //   })
  watch: {
    click() {
      console.log(this.click);
      this.$emit("clickAddQuestion", this.click);
    },
  },
  methods: {
    addQuestionClick() {
      this.click = !this.click;
    },
  },
};
</script>
