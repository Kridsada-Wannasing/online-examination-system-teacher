<template>
  <div class="h-100">
    <v-form ref="form" v-model="valid" lazy-validation>
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
            dense
            :items="types"
            label="เลือกประเภท"
            :rules="[(v) => !!v || 'กรุณาเลือกประเภทการสอบ']"
            v-model="examData.examType"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="4">
          <span class="color-dark-blue" style="font-size: 12px;"
            >ปีการศึกษา</span
          >
          <v-select
            solo
            placeholder="ปีการศึกษา"
            rounded
            dense
            :rules="[(v) => !!v || 'กรุณาเลือกปีการศึกษา']"
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
            rounded
            dense
            :rules="[(v) => !!v || 'กรุณาเลือกภาคการศึกษา']"
            :items="terms"
            v-model="examData.term"
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
          :disabled="!valid"
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
          :disabled="!valid"
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
    </v-form>
  </div>
</template>
<script>
import range from "lodash/range";
import { mapState } from "vuex";

export default {
  name: "CreateExam",
  props: {
    exam: Object,
    status: Boolean,
    subjectId: [Number, String],
  },
  data() {
    return {
      types: ["กลางภาค", "ปลายภาค", "สอบย่อย"],
      formatOfAnswer: [
        { text: "แก้ไขคำตอบได้", format: true },
        { text: "แก้ไขคำตอบไม่ได้", format: false },
      ],
      authorityOfExam: [
        { text: "public", authority: true },
        { text: "private", authority: false },
      ],
      years: [],
      valid: true,
      terms: [1, 2, 3],
      examData: {
        authority: false,
        examName: "",
        examType: "",
        term: null,
        year: null,
        subjectId: this.subjectId,
      },
    };
  },
  computed: {
    ...mapState("subject", ["subject"]),
  },
  methods: {
    async createExam() {
      try {
        // if (!this.examData.examType) {
        //   return alert("กรุณาเลือกประเภทการสอบ");
        // }

        // if (!this.examData.year) {
        //   return alert("กรุณาเลือกปีการศึกษา");
        // }

        // if (!this.examData.term) {
        //   return alert("กรุณาเลือกภาคการศึกษา");
        // }

        if (!this.examData.examName) {
          this.examData.examName = `ข้อสอบ${this.examData.examType}วิชา ${this.subject.subjectName}  ภาคเรียนที่ ${this.examData.term}/${this.examData.year}`;
        }

        const response = await this.$store.dispatch(
          "exam/createExam",
          this.examData
        );

        alert(`${response.status}: ${response.message}`);

        this.$emit("statusChange", status);
      } catch (error) {
        alert(error.response.data);
      }
    },
    cancel() {
      if (this.exam) this.examData = this.cachedExam;
      else this.$emit("statusChange", status);
    },
    async editExam() {
      try {
        const response = await this.$store.dispatch(
          "exam/editExam",
          this.examData
        );
        alert(`${response.status}: ${response.message}`);
        this.$emit("statusChange", status);
      } catch (error) {
        alert(error);
      }
    },
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
  },
};
</script>
