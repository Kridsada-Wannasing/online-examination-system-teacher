<template>
  <div class="h-100">
    <v-row no-gutters class="h-100">
      <v-col class="mb-5" cols="12" lg="4" md="6" sm="6" xs="12" v-for="(item, i) in items" :key="i">
        <Folder
          class="mr-2"
          :color="item.color"
          :title="item.title"
          :classId="item.classId"
          :code="item.code"
          :date="item.date"
          :sector="item.sector"
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
export default {
  name: "listAppointment",
  components: {
    Folder
  },
  data: () => ({
    status: false,
    items: [
      {
        color: "green",
        classId: "A",
        title: "วิศวกรรมคอมพิวเตอร์",
        date: "1/2563 ภาคกลาง",
        sector: "20/08/2020"
      },
      {
        color: "blue",
        classId: "B",
        title: "วิศวกรรมคอมพิวเตอร์",
        date: "1/2563 ภาคกลาง",
        sector: "20/08/2020"
      },
      {
        color: "green",
        classId: "A",
        title: "วิศวกรรมคอมพิวเตอร์",
        date: "1/2563 ภาคกลาง",
        sector: "20/08/2020"
      }
    ]
  })
};
</script>
