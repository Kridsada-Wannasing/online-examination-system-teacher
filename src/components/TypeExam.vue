<template>
  <div class="h-100">
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="4">
        <span class="color-dark-blue" style="font-size: 12px;"
          >ชื่อชุดข้อสอบ</span
        >
        <v-text-field
          solo
          placeholder="ชื่อชุดข้อสอบ"
          filled
          rounded
          dense
          v-model="examData.examName"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="4">
        <span class="color-dark-blue" style="font-size: 12px;"
          >ประเภทการสอบ</span
        >
        <v-select
          solo
          rounded
          filled
          dense
          :items="types"
          label="เลือกประเภท"
          hide-details
          v-model="examData.examType"
        ></v-select>
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="4">
        <span class="color-dark-blue" style="font-size: 12px;">ปีการศึกษา</span>
        <v-select
          solo
          placeholder="ปีการศึกษา"
          filled
          rounded
          dense
          hide-details
          :items="years"
          v-model="examData.year"
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="4">
        <span class="color-dark-blue" style="font-size: 12px;"
          >ภาคการศึกษา</span
        >
        <v-select
          solo
          placeholder="ภาคการศึกษา"
          filled
          rounded
          dense
          hide-details
          :items="terms"
          v-model="examData.term"
        ></v-select>
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="4">
        <span class="color-dark-blue" style="font-size: 12px;"
          >รูปแบบการตอบคำถาม</span
        >
        <v-select
          solo
          rounded
          filled
          dense
          :items="formatOfAnswer"
          item-text="text"
          item-value="format"
          label="เลือกรูปแบบ"
          v-model="examData.format"
        ></v-select>
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="4">
        <span class="color-dark-blue" style="font-size: 12px;"
          >สิทธิ์การเข้าถึง</span
        >
        <v-select
          solo
          placeholder="สิทธิ์การเข้าถึง"
          filled
          rounded
          dense
          :items="authorityOfExam"
          item-text="text"
          item-value="authority"
          v-model="examData.authority"
        ></v-select>
      </v-col>
    </v-row>
    <div class="mt-5 mb-10" style="display: flex; justify-content: flex-end;">
      <v-btn
        v-if="exam"
        rounded
        color="#6dc449"
        small
        style="width: 150px"
        dark
        @click="editExam"
        >บันทึก</v-btn
      >
      <v-btn
        v-else
        rounded
        color="#6dc449"
        small
        style="width: 150px"
        dark
        @click="createExam"
        >สร้างชุดข้อสอบ</v-btn
      >
      <v-btn
        class="ml-4"
        outlined
        rounded
        color="red"
        small
        style="width: 150px"
        dark
        @click="cancel"
        >ยกเลิก</v-btn
      >
    </div>
  </div>
</template>
<script>
import range from "lodash/range";
import { mapState } from "vuex";

export default {
  name: "typeExam",
  props: {
    exam: Object,
    status: Boolean,
    subjectId: [Number, String]
  },
  data() {
    return {
      types: ["กลางภาค", "ปลายภาค", "สอบย่อย"],
      formatOfAnswer: [
        { text: "แก้ไขคำตอบได้", format: true },
        { text: "แก้ไขคำตอบไม่ได้", format: false }
      ],
      authorityOfExam: [
        { text: "public", authority: true },
        { text: "private", authority: false }
      ],
      years: [],
      terms: [1, 2, 3],
      examData: {
        format: null,
        authority: null,
        examName: "",
        examType: "",
        term: null,
        year: null,
        subjectId: this.subjectId
      }
    };
  },
  computed: {
    ...mapState("subject", ["subject"])
  },
  methods: {
    async createExam() {
      if (!this.examData.examName) {
        this.examData.examName = `ข้อสอบวิชา${this.subject.subjectName}  ภาคเรียนที่ ${this.examData.term}/${this.examData.year}`;
      }

      const response = await this.$store.dispatch(
        "exam/createExam",
        this.examData
      );

      alert(`${response.status}: ${response.message}`);

      this.$emit("statusChange", status);
    },
    cancel() {
      if (this.exam) this.examData = this.cachedExam;
      else this.$emit("statusChange", status);
    },
    async editExam() {
      const response = await this.$store.dispatch(
        "exam/editExam",
        this.examData
      );
      alert(`${response.status}: ${response.message}`);
      this.$emit("statusChange", status);
    }
  },
  created() {
    if (this.exam) {
      this.examData = this.exam;
      this.cachedExam = Object.assign({}, this.exam);
    }
    const currentYear = new Date().getFullYear() + 544;
    const startYear = currentYear - 20;

    this.years = range(startYear, currentYear);

    this.$store.dispatch("subject/getSubject", this.subjectId);
    console.log(this.subject);
  }
};
</script>
