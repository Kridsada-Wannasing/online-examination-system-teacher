<template>
  <div>
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="4">
        <v-select
          solo
          rounded
          filled
          dense
          :items="subjects"
          :item-text="'subjectName'"
          :item-value="'subjectId'"
          v-model="subject"
          label="วิชา"
          hide-details
        ></v-select>
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="4">
        <v-select
          solo
          rounded
          filled
          dense
          :items="exams"
          :item-text="'examName'"
          :item-value="'examId'"
          v-model="exam"
          label="ชุดข้อสอบ"
          hide-details
        ></v-select>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapState } from "vuex";
import qs from "qs";
export default {
  name: "filterClass",
  data() {
    return {
      subject: null,
      exam: null,
      query: {}
    };
  },
  watch: {
    subject() {
      this.query.subjectId = this.subject;
      this.$store.dispatch("exam/getAllExams", { subjectId: this.subject });
    },
    exam() {
      this.query.examId = this.exam;
      this.$store.dispatch("score/getAllScores", qs.stringify(this.query));
    }
  },
  computed: {
    ...mapState("subject", ["subjects"]),
    ...mapState("exam", ["exams"])
  },
  created() {
    this.$store.dispatch("subject/getAllSubjects");
  }
};
</script>
