<template>
  <div class="h-100 w-100">
    <div style="height: 20%; min-height: 20%; max-height: 20%;">
      <h1 class="color-white">ชุดข้อสอบ</h1>
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
            label="วิชา"
            v-model="subject"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="4">
          <v-select
            solo
            rounded
            filled
            dense
            :items="types"
            v-model="examType"
            label="การสอบ"
          ></v-select>
        </v-col>
      </v-row>
    </div>

    <div class="w-100" style="height: 40%; min-height: 40%; max-height: 40%;">
      <v-card
        class="pa-10 h-100 w-100"
        style="border-radius: 20px; display: inline-table;"
        outlined
      >
        <div
          style="display: flex; justify-content: space-between; height: 20%; min-height: 20%; max-height: 20%;"
        >
          <h3 class="color-dark-blue">ชุดข้อสอบ</h3>
          <v-btn small outlined color="primary" @click="status = !status">
            <v-icon left>mdi-plus</v-icon>เพิ่มชุดข้อสอบ
          </v-btn>
        </div>
        <div
          class="mt-5"
          style="height: 80%; min-height: 80%; max-height: 80%; overflow: auto;"
        >
          <v-row no-gutters>
            <v-col
              class="h-100 mb-5"
              cols="12"
              lg="4"
              md="6"
              sm="6"
              xs="12"
              v-for="(exam, i) in exams"
              :key="i"
            >
              <Folder :color="i % 2 === 0 ? 'green' : 'blue'" :exam="exam" />
            </v-col>
            <v-col cols="12" lg="4" md="6" sm="6" xs="12" class="h-100 mb-5">
              <Folder class="mr-2" color="plus" />
            </v-col>
          </v-row>
        </div>
      </v-card>
    </div>

    <div
      v-if="status"
      class="pt-5"
      style="height: 40%; min-height: 40%; max-height: 40%;"
    >
      <v-card
        class="pa-10 h-100 w-100"
        style="border-radius: 20px; display: inline-table;"
        outlined
      >
        <div style="height: 20%; min-height: 20%; max-height: 20%;">
          <h4 class="color-dark-blue">เพิ่มชุดข้อสอบ</h4>
          <hr class="mt-3 mb-3" />
        </div>
        <div
          class="mt-5"
          style="overflow-y: auto; height: 80%; min-height: 80%; max-height: 80%;"
        >
          <TypeExam />
        </div>
      </v-card>
    </div>
  </div>
</template>
<script>
import Folder from "./Folder";
import TypeExam from "./TypeExam";
import { mapState } from "vuex";

export default {
  name: "listExam",
  components: {
    Folder,
    TypeExam,
  },
  data: () => ({
    types: ["กลางภาค", "ปลายภาค"],
    status: false,
    examType: "",
    semester: "",
    subject: null,
  }),
  created() {
    this.$store.dispatch("subject/getAllSubjects");
    console.log(this.subjects);
  },
  computed: {
    ...mapState("subject", ["subjects"]),
    ...mapState("exam", ["exams"]),
  },
  watch: {
    subject() {
      this.$store.dispatch("exam/getAllExam", this.subject);
    },
  },
  methods: {
    mapExamType() {
      return this.exams.map((exam) => exam.examType);
    },
    mapSemester() {
      return this.exams.map((exam) => `${exam.term}/${exam.year}`);
    },
    getAllExams(subject) {
      this.$store.dispatch("exam/getAllExams", subject);
    },
  },
};
</script>
