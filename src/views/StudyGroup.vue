<style lang="scss"></style>
<template id="welcome">
  <div class="h-100">
    <v-row no-gutters class="h-100" align="center">
      <v-col lg="8" md="8" sm="12" xs="12" class="h-100">
        <WelcomeBox />
        <div class="pt-15">
          <Group />
        </div>
      </v-col>
      <v-col lg="4" md="4" sm="12" xs="12" class="h-100">
        <ProfileMenu />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import Group from "@/components/Group";
import ProfileMenu from "@/components/ProfileMenu";
import WelcomeBox from "@/components/WelcomeBox";
export default {
  name: "studyGroup",
  components: {
    Group,
    ProfileMenu,
    WelcomeBox
  }
};
</script>
