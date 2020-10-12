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
            name="subject"
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
        <v-col cols="12" sm="6" md="4" lg="4">
          <v-select
            solo
            rounded
            filled
            dense
            :items="years"
            v-model="year"
            label="ปีการศึกษา"
          ></v-select>
        </v-col>
      </v-row>
    </div>

    <div v-if="!status" class="w-100" style="height: 80%; max-height: 80%;">
      <v-card
        v-if="isSelectSubject"
        class="pt-8 px-8 h-100 w-100"
        style="border-radius: 20px; display: inline-table;"
        outlined
      >
        <div
          style="display: flex; justify-content: space-between; height: 12%; min-height: 12%; max-height: 12%;"
        >
          <h3 class="color-dark-blue">ชุดข้อสอบ</h3>
          <v-btn
            small
            outlined
            color="primary"
            @click="showCreateExam"
            v-if="isSelectSubject"
          >
            <v-icon left>mdi-plus</v-icon>เพิ่มชุดข้อสอบ
          </v-btn>
        </div>
        <div
          style="height: 80%; min-height: 80%; max-height: 80%; overflow: auto;"
          v-if="exams.length > 0"
        >
          <v-row no-gutters>
            <v-col
              class="h-100 mb-9"
              cols="12"
              lg="4"
              md="6"
              sm="6"
              xs="12"
              v-for="(exam, i) in exams"
              :key="i"
            >
              <router-link
                :to="{
                  name: 'Question',
                  params: { subjectId: subject, examId: exam.examId },
                }"
              >
                <Folder
                  v-if="exam"
                  :color="i % 2 === 0 ? 'green' : 'blue'"
                  :exam="exam"
                />
              </router-link>
            </v-col>
            <!-- <v-col cols="12" lg="4" md="6" sm="6" xs="12" class="h-100 mb-9">
              <Folder class="mr-2" color="plus" />
            </v-col> -->
          </v-row>
        </div>
        <div v-else></div>
      </v-card>
      <v-card
        v-else
        class="pt-8 px-8 h-100 w-100 d-flex justify-center align-center text-center"
        style="border-radius: 20px; display: inline-table;"
        outlined
      >
        <h3>กรุณาเลือกวิชาเพื่อค้นหาชุดข้อสอบ</h3>
      </v-card>
    </div>

    <div v-else class="pt-5" style="height: 80%; max-height: 80%;">
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
          <CreateExam
            :status="status"
            @statusChange="getStatusChange"
            :subjectId="subject"
          />
        </div>
      </v-card>
    </div>
  </div>
</template>
<script>
import Folder from "./Folder";
import CreateExam from "./CreateExam";
import { mapState } from "vuex";
import qs from "qs";
import range from "lodash/range";

export default {
  name: "listExam",
  components: {
    Folder,
    CreateExam,
  },
  data: () => ({
    types: ["กลางภาค", "ปลายภาค", "สอบย่อย"],
    status: false,
    examType: "",
    years: [],
    year: "",
    subject: null,
    query: {},
  }),
  created() {
    this.$store.dispatch("subject/getAllSubjects");
  },
  mounted() {
    const currentYear = new Date().getFullYear() + 544;
    const startYear = currentYear - 20;

    this.years = range(startYear, currentYear);
  },
  computed: {
    ...mapState("subject", ["subjects"]),
    ...mapState("exam", ["exams"]),
    isSelectSubject() {
      return this.subject ? true : false;
    },
  },
  watch: {
    subject() {
      this.$store.dispatch("exam/getAllExams", { subjectId: this.subject });
      this.status = false;
    },
    examType() {
      this.query.examType = this.examType;
      this.$store.dispatch("exam/getAllExams", {
        subjectId: this.subject,
        query: qs.stringify(this.query),
      });
    },
    year() {
      this.query.year = this.year;
      this.$store.dispatch("exam/getAllExams", {
        subjectId: this.subject,
        query: qs.stringify(this.query),
      });
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
    getStatusChange(status) {
      this.status = status;
    },
    showCreateExam() {
      this.status = !this.status;
    },
  },
};
</script>
