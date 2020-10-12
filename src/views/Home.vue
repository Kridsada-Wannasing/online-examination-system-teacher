<template>
  <div class="home container-full-screen">
    <div class="h-100 pa-10" style="display: flex">
      <div style="min-width: 250px; max-width: 250px; width: 250px">
        <TeacherMenu />
      </div>
      <div class="w-100 pl-10">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import TeacherMenu from "@/components/TeacherMenu.vue";

export default {
  name: "Home",
  components: {
    TeacherMenu,
  },
};
</script>
