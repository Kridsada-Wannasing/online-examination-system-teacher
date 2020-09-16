<template>
  <div class="h-100">
    <v-card
      class="mx-auto h-100 w-100"
      style="border-radius: 20px; display: inline-table;"
      outlined
    >
      <div class="pa-10 h-100" style="overflow-y: auto;">
        <div
          class="mb-5"
          style="display: flex; justify-content: space-between;"
        >
          <h3 class="color-dark-blue">กลุ่มเรียน</h3>
        </div>
        <div>
          <v-row no-gutters>
            <v-col
              class="mb-2"
              cols="12"
              lg="4"
              md="6"
              sm="6"
              xs="12"
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
          </v-row>
        </div>
      </div>
    </v-card>
  </div>
</template>
<script>
import Folder from "./Folder";
export default {
  name: "group",
  components: {
    Folder
  },
  data: () => ({
    items: [
      {
        color: "green",
        classId: "",
        title: "",
        code: "ENC 20022"
      },
      {
        color: "blue",
        classId: "",
        title: "",
        code: "ENC 20022"
      },
      {
        color: "green",
        classId: "",
        title: "",
        code: "ENC 20022"
      }
    ]
  })
};
</script>
