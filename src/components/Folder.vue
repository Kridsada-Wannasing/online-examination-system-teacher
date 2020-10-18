<template>
  <div class="mr-10">
    <div v-if="color == 'green'" class="h-100">
      <v-img src="@/assets/icon/folder-green.svg">
        <v-row class="white--text px-3 py-4 h-100">
          <!--  -->
          <v-col v-if="meeting" class="text-left">
            <div style="height: 70%">
              <p class="mb-0" style="font-size: 14px;">
                <b>{{ meeting.subjectId }}</b>
              </p>
              <p style="font-size: 12px">{{ meeting.Subject.subjectName }}</p>
            </div>
            <div style="height: 30%">
              <p class="mb-0" style="font-size: 12px">
                {{ formatMeetingDate }}น.
              </p>
              <!-- <p class="mb-0" style="font-size: 12px">{{ exam.examType }}</p> -->
            </div>
          </v-col>
          <!--  -->
          <v-col v-else-if="exam" class="text-left">
            <div style="height: 70%">
              <p class="mb-0" style="font-size: 14px;">
                <b>{{ exam.subjectId }}</b>
              </p>
              <p style="font-size: 12px">{{ exam.examName }}</p>
            </div>
            <div style="height: 30%">
              <p class="mb-0" style="font-size: 14px" v-if="checkAuthorityExam">
                (ไม่ใช่ชุดข้อสอบของท่าน)
              </p>
              <p class="mb-0" style="font-size: 12px">{{ exam.examType }}</p>
            </div>
          </v-col>
          <!--  -->
          <v-col v-else-if="subject" class="text-left">
            <div style="height: 70%">
              <p class="mb-0" style="font-size: 14px;">
                <b>{{ subject.subjectId }}</b>
              </p>
              <p style="font-size: 12px">
                {{ subject.subjectName }}
              </p>
            </div>
          </v-col>
          <!--  -->
        </v-row>
      </v-img>
    </div>
    <div v-if="color == 'blue'">
      <v-img src="@/assets/icon/folder-blue.svg">
        <v-row class="white--text px-3 py-4 h-100">
          <!--  -->
          <v-col v-if="meeting" class="text-left">
            <div style="height: 70%">
              <p class="mb-0" style="font-size: 14px;">
                <b>{{ meeting.subjectId }}</b>
              </p>
              <p style="font-size: 12px">{{ meeting.Subject.subjectName }}</p>
            </div>
            <div style="height: 30%">
              <p class="mb-0" style="font-size: 12px">
                {{ formatMeetingDate }}น.
              </p>
              <!-- <p class="mb-0" style="font-size: 12px">{{ exam.examType }}</p> -->
            </div>
          </v-col>
          <!--  -->
          <v-col v-else-if="exam" class="text-left">
            <div style="height: 70%">
              <p class="mb-0" style="font-size: 14px;">
                <b>{{ exam.subjectId }}</b>
              </p>
              <p style="font-size: 12px">{{ exam.examName }}</p>
            </div>
            <div style="height: 30%">
              <p class="mb-0" style="font-size: 14px" v-if="checkAuthorityExam">
                (ไม่ใช่ชุดข้อสอบของท่าน)
              </p>
              <p class="mb-0" style="font-size: 12px">{{ exam.examType }}</p>
            </div>
          </v-col>
          <!--  -->
          <v-col v-else-if="subject" class="text-left">
            <div style="height: 70%">
              <p class="mb-0" style="font-size: 14px;">
                <b>{{ subject.subjectId }}</b>
              </p>
              <p style="font-size: 12px">
                {{ subject.subjectName }}
              </p>
            </div>
          </v-col>
          <!--  -->
        </v-row>
      </v-img>
    </div>
    <div v-if="color == 'plus'">
      <v-img src="@/assets/icon/folder.svg"></v-img>
    </div>
  </div>
</template>
<script>
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
export default {
  name: "folder",
  props: {
    exam: Object,
    meeting: Object,
    color: String,
    subject: Object,
  },
  data() {
    return {
      imagePath: `@/assets/icon/folder-${this.color}.svg`,
    };
  },
  methods: {
    getImgUrl() {
      return require(this.imagePath);
    },
    formatDate(date) {
      dayjs.extend(localizedFormat);
      require("dayjs/locale/th");
      return dayjs(date)
        .locale("th")
        .format("LLL");
    },
  },
  computed: {
    formatMeetingDate() {
      dayjs.extend(localizedFormat);
      require("dayjs/locale/th");
      return dayjs(this.meeting.startExamDate)
        .locale("th")
        .format("LLL");
    },
    checkAuthorityExam() {
      if (
        this.exam.teacherId ==
        JSON.parse(localStorage.getItem("teacher")).teacherId
      ) {
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>
