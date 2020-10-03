<template>
  <div class="h-100">
    <v-row class="h-100">
      <v-col cols="9" class="ma-0 pa-0">
        <div
          class="w-100"
          style="height: 100%; max-height: 100%; margin:0; padding:0;"
        >
          <v-card
            class="pt-8 px-8 h-100 w-100"
            style="border-radius: 20px; display: inline-table;"
            outlined
          >
            <div
              style="display: flex; justify-content: space-between; height: 12%; min-height: 12%; max-height: 12%;"
            >
              <h3 class="color-dark-blue">เลือกการนัดหมายเพื่อสร้างห้องสอบ</h3>
            </div>
            <div
              style="height: 80%; min-height: 80%; max-height: 80%; overflow: auto;"
            >
              <v-row no-gutters>
                <v-col
                  class="h-100 mb-9"
                  cols="12"
                  lg="4"
                  md="6"
                  sm="6"
                  xs="12"
                  v-for="(meeting, i) in meetings"
                  :key="i"
                >
                  <router-link
                    :to="{
                      name: 'CreateExamination',
                      params: { meetingId: meeting.meetingId },
                    }"
                    style="text-decoration:none;"
                  >
                    <Folder
                      v-if="meeting"
                      :color="i % 2 === 0 ? 'green' : 'blue'"
                      :meeting="meeting"
                    />
                  </router-link>
                </v-col>
                <v-col
                  cols="12"
                  lg="4"
                  md="6"
                  sm="6"
                  xs="12"
                  class="h-100 mb-9"
                >
                  <Folder class="mr-2" color="plus" />
                </v-col>
              </v-row>
            </div>
          </v-card>
        </div>
      </v-col>
      <v-col cols="3" class="ma-0 pa-0 h-100"><ProfileMenu /></v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ProfileMenu from "@/components/ProfileMenu";
import Folder from "@/components/Folder";
export default {
  components: {
    ProfileMenu,
    Folder,
  },
  computed: {
    ...mapState("meeting", ["meetings"]),
  },
  created() {
    this.$store.dispatch("meeting/getAllMeetings");
  },
};
</script>

<style></style>
