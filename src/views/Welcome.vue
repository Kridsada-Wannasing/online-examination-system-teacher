<style lang="scss"></style>
<template id="welcome">
  <div class="h-100">
    <v-row no-gutters class="h-100" align="center">
      <v-col lg="9" md="8" sm="12" xs="12" class="h-100 pr-5">
        <div style="height: 40%;">
          <WelcomeBox />
        </div>
        <div style="height: 60%;" class="pt-10">
          <ListSubject
            v-if="!status"
            :status="status"
            @changeStatus="getStatusChange"
          />
          <Subject v-else :status="status" @changeStatus="getStatusChange" />
        </div>
      </v-col>
      <v-col lg="3" md="4" sm="12" xs="12" class="h-100 pl-5">
        <ProfileMenu />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import ListSubject from "@/components/ListSubject";
import ProfileMenu from "@/components/ProfileMenu";
import WelcomeBox from "@/components/WelcomeBox";
import Subject from "@/components/Subject";
export default {
  name: "welcome",
  components: {
    ListSubject,
    ProfileMenu,
    WelcomeBox,
    Subject
  },
  data() {
    return {
      status: false
    };
  },
  methods: {
    getStatusChange(event) {
      this.status = event;
    }
  }
};
</script>
