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

      <v-btn class="mt-4 ml-4" outlined color="red" small dark to="/editexam"
        >แก้ไขชุดข้อสอบ</v-btn
      >
    </v-card>
  </div>
</template>
<script>
import Folder from "./Folder";
export default {
  name: "showEditExam",
  props: {
    exam: Object,
  },
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
};
</script>
