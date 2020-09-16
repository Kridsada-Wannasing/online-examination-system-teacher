<template>
  <div class="h-100 w-100">
    <v-card
      class="pa-10 h-100 w-100"
      style="border-radius: 20px; display: inline-table;"
      outlined
    >
      <div style="height: 10%; display: flex; justify-content: space-between;">
        <h3 class="color-dark-blue">รายวิชา</h3>
        <v-btn small outlined color="primary" to="/class">
          <v-icon left>mdi-plus</v-icon>เพิ่มวิชา
        </v-btn>
      </div>
      <div class="mt-10" style="height: 70%; max-height: 70%; overflow: auto;">
        <v-row no-gutters class="h-100">
          <v-col
            cols="12"
            lg="4"
            md="6"
            sm="6"
            xs="12"
            class="h-100 mb-5"
            v-for="(item, i) in items"
            :key="i"
          >
            <Folder
              :color="item.color"
              :title="item.title"
              :classId="item.classId"
              :code="item.code"
            />
          </v-col>
          <v-col class="h-100 mb-5" cols="12" lg="4" md="6" sm="6" xs="12">
            <Folder color="plus" />
          </v-col>
        </v-row>
      </div>
    </v-card>
  </div>
</template>
<script>
import Folder from "./Folder";
export default {
  name: "listClass",
  components: {
    Folder
  },
  data: () => ({
    items: [
      {
        color: "green",
        classId: "1234567",
        title: "วิศวกรรมคอมพิวเตอร์",
        code: "ENC 2002"
      },
      {
        color: "blue",
        classId: "1234567",
        title: "วิศวกรรมคอมพิวเตอร์",
        code: "ENC 2002"
      },
      {
        color: "green",
        classId: "1234567",
        title: "วิศวกรรมคอมพิวเตอร์",
        code: "ENC 2002"
      }
    ]
  })
};
</script>
