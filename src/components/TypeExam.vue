<template>
  <div class="h-100">
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="4">
        <span class="color-dark-blue" style="font-size: 12px;"
          >ชื่อชุดข้อสอบ</span
        >
        <v-text-field
          solo
          placeholder="ex. 1234567"
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
          :items="type"
          label="เลือกประเภท"
          hide-details
          v-model="examData.examType"
        ></v-select>
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="4">
        <span class="color-dark-blue" style="font-size: 12px;">ปีการศึกษา</span>
        <v-text-field
          solo
          placeholder="ex. 1234567"
          filled
          rounded
          dense
          hide-details
          v-model="examData.year"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="4">
        <span class="color-dark-blue" style="font-size: 12px;"
          >ภาคการศึกษา</span
        >
        <v-text-field
          solo
          placeholder="ex. 1234567"
          filled
          rounded
          dense
          hide-details
          v-model="examData.term"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="4">
        <span class="color-dark-blue" style="font-size: 12px;"
          >รูปแบบการสอบ</span
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
          :v-model="examData.format"
        ></v-select>
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="4">
        <span class="color-dark-blue" style="font-size: 12px;"
          >สิทธิ์การเข้าถึง</span
        >
        <v-select
          solo
          placeholder="ex. 1234567"
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
        rounded
        color="#6dc449"
        small
        style="width: 150px"
        dark
        @click="createExam"
        >บันทึก</v-btn
      >
      <v-btn
        class="ml-4"
        outlined
        rounded
        color="red"
        small
        style="width: 150px"
        dark
        >ยกเลิก</v-btn
      >
    </div>
  </div>
</template>
<script>
export default {
  name: "typeExam",
  components: {},
  props: {
    exam: Object,
  },
  data: () => ({
    type: ["กลางภาค", "ปลายภาค", "สอบย่อย"],
    formatOfAnswer: [
      { text: "แก้ไขคำตอบได้", format: true },
      { text: "แก้ไขคำตอบไม่ได้", format: false },
    ],
    authorityOfExam: [
      { text: "public", authority: true },
      { text: "private", authority: false },
    ],
    examData: {
      format: null,
      authority: null,
      examName: "",
      examType: "",
      term: null,
      year: null,
    },
  }),
  methods: {
    createExam() {
      this.$store
        .dispatch("exam/createExam", this.exam)
        .then((response) =>
          this.$router.push({
            name: "EditExam",
            params: { examId: response.examId },
          })
        )
        .catch((error) => console.log(error));
    },
    cancel() {
      this.examData = this.cachedExam;
    },
  },
  created() {
    this.examData = this.exam;
    this.cachedExam = Object.assign({}, this.exam);
  },
};
</script>
