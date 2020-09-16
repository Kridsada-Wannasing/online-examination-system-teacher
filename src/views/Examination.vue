<style lang="scss"></style>
<template id="examination">
  <div class="h-100">
    <v-row no-gutters class="h-100" align="center">
      <v-col lg="9" md="8" sm="12" xs="12" class="h-100 pr-5">
        <ListExam />
      </v-col>
      <v-col lg="3" md="4" sm="12" xs="12" class="h-100 pl-5">
        <ProfileMenu />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import ProfileMenu from "@/components/ProfileMenu";
import ListExam from "@/components/ListExam";
export default {
  name: "examination",
  components: {
    ProfileMenu,
    ListExam
  }
};
</script>
