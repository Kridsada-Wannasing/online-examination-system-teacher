<template>
  <div style="display: flex;">
    <v-card
      class="mx-auto pa-10 text-center justify-center"
      style="border-radius: 20px; display: inline-block;"
      outlined
    >
      <div class="text-center w-100">
        <Folder class="w-100" :color="'green'" :exam="exam" />
      </div>
      <v-btn
        v-if="checkAuthorityExam"
        class="mt-4 ml-4"
        color="success"
        small
        dark
        :to="{ name: 'EditExam', params: { examId: examId } }"
        >แก้ไขชุดข้อสอบ</v-btn
      >
      <v-btn
        v-if="checkAuthorityExam"
        class="mt-4 ml-4"
        outlined
        color="red"
        small
        dark
        @click="deleteExam"
        >ลบชุดข้อสอบ</v-btn
      >
      <v-btn
        v-else
        class="mt-4 ml-4"
        outlined
        color="red"
        small
        dark
        @click="duplicateExam"
        >คัดลอกชุดข้อสอบ</v-btn
      >
    </v-card>
  </div>
</template>
<script>
import Folder from "./Folder";
import { mapState } from "vuex";

export default {
  name: "showEditExam",
  props: ["examId", "subjectId"],
  components: {
    Folder
  },
  created() {
    this.$store.dispatch("exam/getExam", {
      examId: this.examId,
      subjectId: this.subjectId
    });
  },
  computed: {
    ...mapState("exam", ["exam"]),
    checkAuthorityExam() {
      if (
        this.exam.teacherId ==
        JSON.parse(localStorage.getItem("teacher")).teacherId
      ) {
        this.$emit("isYourExam", true);
        return true;
      } else {
        this.$emit("isYourExam", false);
        return false;
      }
    }
  },
  methods: {
    deleteExam() {
      confirm("คุณต้องการลบข้อมูลชุดข้อสอบนี้หรือไม่") &&
        this.$store
          .dispatch("exam/deleteExam", this.examId)
          .then(() => this.$router.push({ name: "Exam" }));
    },
    duplicateExam() {
      confirm("คุณต้องการคัดลอกชุดข้อสอบนี้หรือไม่") &&
        this.$store
          .dispatch("exam/duplicateExam", this.examId)
          .then(response => {
            alert(`${response.status}: ${response.message}`);
            this.$router.push({
              name: "EditExam",
              params: {
                subjectId: response.newDuplicateExam.subjectId,
                examId: response.newDuplicateExam.examId
              }
            });
          });
    }
  }
};
</script>
