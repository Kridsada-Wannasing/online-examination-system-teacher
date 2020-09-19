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
        class="mt-4 ml-4"
        outlined
        color="red"
        small
        dark
        :to="{ name: 'EditExam', params: { examId: examId } }"
        >แก้ไขชุดข้อสอบ</v-btn
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
    Folder,
  },
  data: () => ({
    // item: {
    //   color: "green",
    //   classId: "A",
    //   title: "วิศวกรรมคอมพิวเตอร์",
    //   date: "1/2563",
    //   sector: "ภาคกลาง",
    // },
  }),
  created() {
    this.$store.dispatch("exam/getExam", {
      examId: this.examId,
      subjectId: this.subjectId,
    });
  },
  computed: {
    ...mapState("exam", ["exam"]),
  },
};
</script>
