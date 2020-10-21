<style lang="scss"></style>
<template id="appointment">
  <div class="h-100">
    <v-row no-gutters class="h-100" align="center">
      <v-col lg="9" md="8" sm="12" xs="12" class="h-100 pr-5">
        <h1 class="color-white">การนัดหมาย</h1>
        <v-row v-if="!status">
          <v-col cols="12" sm="6" md="4" lg="4">
            <v-select
              solo
              rounded
              filled
              dense
              :items="subjects"
              :item-text="'subjectName'"
              :item-value="'subjectId'"
              @change="getMeetings"
              label="วิชา"
              hide-details
            ></v-select>
          </v-col>
        </v-row>
        <div class="pt-8" v-if="isSelectSubject" style="max-height: 400px;">
          <v-card v-if="!status" class="pa-10" style="border-radius: 20px">
            <div
              class="pb-5"
              style="display: flex; justify-content: space-between;"
            >
              <h3 class="color-dark-blue">การนัดหมายตอนนี้</h3>
              <v-btn small outlined color="primary" @click="status = !status">
                <v-icon left>mdi-plus</v-icon>เพิ่มการนัดหมาย
              </v-btn>
            </div>
            <ListAppointment />
          </v-card>

          <div v-else>
            <AddAppointment
              :subject="subject"
              :status="status"
              @statusChange="getStatusChange"
            />
          </div>
        </div>
        <div v-else class="pt-8" style="max-height: 500px;">
          <v-card
            class="pa-10 d-flex justify-center align-center text-center rounded-xl"
            height="500"
          >
            <h3>กรณาเลือกรายวิชาเพื่อแสดงการนัดหมาย</h3>
          </v-card>
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
import ListAppointment from "@/components/ListAppointment";
import AddAppointment from "@/components/AddAppointment";
import { mapState } from "vuex";
import qs from "qs";
export default {
  name: "appointment",
  components: {
    ProfileMenu,
    ListAppointment,
    AddAppointment,
  },
  data: () => ({
    status: false,
    query: {},
    isSelectSubject: false,
    subject: null,
  }),
  methods: {
    getStatusChange(event) {
      this.status = event;
    },
    getMeetings(event) {
      this.query.subjectId = event;
      this.isSelectSubject = true;
      this.subject = event;
      this.$store.dispatch("meeting/getAllMeetings", qs.stringify(this.query));
    },
  },
  computed: {
    ...mapState("subject", ["subjects"]),
  },
  mounted() {
    this.$store.dispatch("subject/getAllSubjects");
  },
};
</script>
