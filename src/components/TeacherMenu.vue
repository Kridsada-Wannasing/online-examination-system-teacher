<template>
  <div class="h-100">
    <v-card
      class="mx-auto"
      min-height="100%"
      max-height="100%"
      height="100%"
      min-width="250"
      max-width="250"
      style="border-radius: 20px;"
      outlined
    >
      <div class="text-center pt-10">
        <img
          src="@/assets/logo/logo.svg"
          style="background-position: center"
          width="150px"
        />
      </div>
      <v-list class="pt-15">
        <v-list-item-group v-model="item" color="primary">
          <router-link
            v-for="(item, i) in items"
            :key="i"
            :to="item.route"
            tag="div"
          >
            <v-list-item>
              <v-list-item-content style="padding-left: 23%">
                <span>
                  <v-icon v-text="item.icon" class="pr-2"></v-icon>
                  {{ item.text }}
                </span>
              </v-list-item-content>
            </v-list-item>
          </router-link>
        </v-list-item-group>
      </v-list>
      <div
        class="text-center w-100"
        style="position: absolute; bottom: 10px; font-size: 12px;"
      >
        &copy; 2020 Edutest. All Rights Reserved
      </div>
    </v-card>
  </div>
</template>
<script>
export default {
  name: "teacherMenu",
  data: () => ({
    item: 0,
    items: [
      {
        text: "รายวิชา",
        icon: "mdi-file-document-outline",
        route: { name: "Welcome" },
      },
      {
        text: "ชุดข้อสอบ",
        icon: "mdi-pencil",
        route: { name: "Exam" },
      },
      { text: "คะแนนสอบ", icon: "mdi-poll", route: { name: "Score" } },
      {
        text: "การนัดหมาย",
        icon: "mdi-calendar-blank-outline",
        route: { name: "Appointment" },
      },
      // {
      //   text: "ห้องสอบ",
      //   icon: "mdi-cube-outline",
      //   route: { name: "Examination" },
      // },
      {
        text: "บัญชีนักศึกษา",
        icon: "mdi-account-multiple-plus",
        route: { name: "ListStudent" },
      },
    ],
  }),
};
</script>
