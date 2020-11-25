<template>
  <v-dialog v-model="dialog" max-width="900" persistent>
    <v-card class="rounded-lg px-7">
      <div class="pt-4 d-flex justify-end">
        <v-btn @click="cancel">ปิดหน้าต่าง</v-btn>
      </div>
      <div v-for="(item, index) in examLogs" :key="index">
        <div>
          <v-row>
            <v-col>
              <h2 class="color-dark-blue">
                {{ item.question.question }} ({{
                  item.question.sumScoreQuestion
                }}
                คะแนน)
              </h2>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <div
                class="border-div rounded-xl pa-6"
                style="border: 2px solid #123c5f !important; height:150px"
              >
                <text-highlight
                  class="color-dark-blue"
                  :queries="item.correctAnswer"
                  >{{ item.yourAnswer }}</text-highlight
                >
              </div>
            </v-col>
          </v-row>
        </div>
        <v-form ref="form" v-model="valid">
          <v-row>
            <v-col cols="7"></v-col>
            <v-col cols="5" class="d-flex">
              <p class="ml-4 color-dark-blue">คะแนน</p>
              <v-text-field
                outlined
                dense
                class="ml-4"
                v-model="score[index]"
                :rules="[
                  (v) => !!v || 'ใส่คะแนน',
                  (v) =>
                    /^\+?(0|[1-9]\d*)$/.test(v) || 'ใส่คะแนนเป็นจำนวนเต็มบวก',
                  (v) =>
                    v <= item.question.sumScoreQuestion ||
                    `ใส่คะแนนไม่เกิน ${item.question.sumScoreQuestion} คะแนน`,
                ]"
              ></v-text-field>
              <v-btn class="ml-4" :disabled="!valid" @click="editScore(index)"
                >บันทึกคะแนน</v-btn
              >
            </v-col>
          </v-row>
        </v-form>
        <v-divider class="my-2"></v-divider>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    dialog: Boolean,
    studentId: [Number, String],
    examId: [Number, String],
    item: Object,
  },
  data() {
    return {
      score: [],
      valid: true,
    };
  },
  watch: {
    studentId() {
      this.$store.dispatch("examination/getExamLogOfQuestion", {
        examId: this.examId,
        studentId: this.studentId,
      });
    },
  },
  computed: {
    ...mapState("examination", ["examLogs"]),
  },
  methods: {
    cancel() {
      this.$emit("dialogChange", !this.dialog);
    },
    editScore(index) {
      let addScore = Number(this.score[index]);
      confirm("ต้องการเปลี่ยนแปลงคะแนนสอบหรือไม่") &&
        this.$store
          .dispatch("score/editScore", {
            scoreId: this.item.scoreId,
            score: this.item.score + addScore,
            examLogId: this.examLogs[index].examLogId,
          })
          .then((response) => {
            alert(`${response.status}: ${response.message}`);
            this.score.splice(index, 1);
            if (this.examLogs.length == 0) this.cancel();
          })
          .catch((error) => alert(error));
    },
  },
};
</script>

<style scoped>
.border-div {
  border: 2px solid #123c5f !important;
}
</style>
