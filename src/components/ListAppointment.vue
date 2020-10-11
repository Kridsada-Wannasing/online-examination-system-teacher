<template>
  <div
    class="h-100"
    style="min-height: 51vh; max-height: 51vh; overflow: auto;"
  >
    <v-row no-gutters class="h-100">
      <v-col
        class="mb-5"
        cols="12"
        lg="4"
        md="6"
        sm="6"
        xs="12"
        v-for="(meeting, i) in meetings"
        :key="i"
      >
        <router-link
          style="text-decoration:none;"
          :to="{
            name: 'ShowAppointment',
            params: { meetingId: meeting.meetingId }
          }"
        >
          <Folder
            class="mr-2"
            :meeting="meeting"
            :color="i % 2 == 0 ? 'green' : 'blue'"
          />
        </router-link>
      </v-col>
      <!-- <v-col cols="12" lg="4" md="6" sm="6" xs="12" class="mb-2">
        <Folder class="mr-2" color="plus" />
      </v-col> -->
    </v-row>
  </div>
</template>
<script>
import Folder from "./Folder";
import { mapState } from "vuex";
export default {
  name: "listAppointment",
  components: {
    Folder
  },
  data: () => ({
    status: false
  }),
  computed: {
    ...mapState("meeting", ["meetings"])
  }
};
</script>
