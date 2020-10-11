<template id="welcome">
  <div class="h-100">
    <v-row no-gutters class="h-100" align="center">
      <v-col lg="9" md="8" sm="12" xs="12" class="h-100 pr-5">
        <h1 class="color-white">ห้องสอบ</h1>
        <div style="height: 100%;">
          <ListExamination />
        </div>
      </v-col>
      <v-col lg="3" md="4" sm="12" xs="12" class="h-100 pl-5">
        <ProfileMenu />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import ProfileMenu from "@/components/ProfileMenu";
import ListExamination from "@/components/ListExamination";
export default {
  name: "welcome",
  components: {
    ProfileMenu,
    ListExamination
  }
};
</script>
<style lang="scss"></style>
