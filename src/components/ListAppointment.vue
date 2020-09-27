<template>
  <div
    class="h-100"
    style="min-height: 20vh; max-height: 20vh; overflow: auto;"
  >
    <v-row no-gutters class="h-100">
      <v-col
        class="mb-5"
        cols="12"
        lg="4"
        md="6"
        sm="6"
        xs="12"
        v-for="(meeting, i) in meetings"
        :key="i"
      >
        <Folder
          class="mr-2"
          :meeting="meeting"
          :color="i % 2 == 0 ? 'green' : 'blue'"
        />
      </v-col>
      <v-col cols="12" lg="4" md="6" sm="6" xs="12" class="mb-2">
        <Folder class="mr-2" color="plus" />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import Folder from "./Folder";
import { mapState } from "vuex";
export default {
  name: "listAppointment",
  components: {
    Folder,
  },
  data: () => ({
    status: false,
    items: [
      {
        color: "green",
        classId: "A",
        title: "วิศวกรรมคอมพิวเตอร์",
        date: "1/2563 ภาคกลาง",
        sector: "20/08/2020",
      },
      {
        color: "blue",
        classId: "B",
        title: "วิศวกรรมคอมพิวเตอร์",
        date: "1/2563 ภาคกลาง",
        sector: "20/08/2020",
      },
      {
        color: "green",
        classId: "A",
        title: "วิศวกรรมคอมพิวเตอร์",
        date: "1/2563 ภาคกลาง",
        sector: "20/08/2020",
      },
    ],
  }),
  created() {
    this.$store.dispatch("meeting/getAllMeetings");
  },
  computed: {
    ...mapState("meeting", ["meetings"]),
  },
};
</script>
