<style lang="scss"></style>
<template id="welcome">
  <div class="h-100">
    <v-row no-gutters class="h-100" align="center">
      <v-col lg="9" md="8" sm="12" xs="12" class="h-100 pr-5">
        <h1 class="color-white">บัญชีนักศึกษา</h1>
        <!-- <div style="height: 30%; min-height: 30%; max-height: 30%;">
          <Group />
        </div> -->
        <Students class="pt-8" />
      </v-col>
      <v-col lg="3" md="4" sm="12" xs="12" class="h-100 pl-5">
        <ProfileMenu />
      </v-col>
    </v-row>
  </div>
</template>
<script>
// import Group from "@/components/Group";
import ProfileMenu from "@/components/ProfileMenu";
import Students from "@/components/Students";
export default {
  name: "listStudent",
  components: {
    // Group,
    ProfileMenu,
    Students,
  },
};
</script>
