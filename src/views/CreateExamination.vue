<template>
  <div class="h-100">
    <v-row class="h-100 ma-0 pa-0">
      <v-col cols="9" class="ma-0 pa-0 mt-0 pt-0">
        <v-row>
          <v-col class="mt-0 pt-0">
            <h1>ห้องสอบ</h1>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="ma-0 pa-0">
            <v-card class="mx-5 px-4 py-2 rounded-xl">
              <div
                style="display: flex; justify-content: space-between; height: 10%; min-height: 10%; max-height: 10%;"
              >
                <h3 class="color-dark-blue ml-5 mt-3">การนัดหมาย</h3>
              </div>
              <div
                style="height: 80%; min-height: 80%; max-height: 80%; overflow: auto;"
              >
                <v-row no-gutters>
                  <v-col
                    class="h-100 ma-0 pa-0"
                    cols="12"
                    lg="4"
                    md="6"
                    sm="6"
                    xs="12"
                  >
                    <Folder class="pa-6" color="green" />
                  </v-col>
                </v-row>
              </div>
              <div
                style="display: flex; justify-content: space-between; height: 10%; min-height: 10%; max-height: 10%;"
              >
                <h3 class="color-dark-blue ml-5 mt-3">ตั้งค่าห้องสอบ</h3>
              </div>
              <div>
                <v-divider class="ma-5"></v-divider>
              </div>
              <div
                style="height: 80%; min-height: 80%; max-height: 80%; overflow: auto;"
              >
                <v-row no-gutters>
                  <v-col
                    class="h-100 mb-2 pa-5"
                    cols="12"
                    lg="3"
                    md="6"
                    sm="6"
                    xs="12"
                  >
                    <v-select rounded dense solo></v-select>
                  </v-col>
                  <v-col
                    class="h-100 mb-2 pa-5"
                    cols="12"
                    lg="3"
                    md="6"
                    sm="6"
                    xs="12"
                  >
                    <v-select rounded dense solo></v-select>
                  </v-col>
                  <v-col
                    class="h-100 mb-2 pa-5"
                    cols="12"
                    lg="3"
                    md="6"
                    sm="6"
                    xs="12"
                  >
                    <v-select rounded dense solo></v-select>
                  </v-col>
                  <v-col
                    class="h-100 mb-2 pa-5"
                    cols="12"
                    lg="3"
                    md="6"
                    sm="6"
                    xs="12"
                  >
                    <v-select rounded dense solo></v-select>
                  </v-col>
                </v-row>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="3" class="h-100 ma-0 pa-0 pl-5">
        <ProfileMenu />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ProfileMenu from "@/components/ProfileMenu";
import Folder from "@/components/Folder";
export default {
  components: {
    ProfileMenu,
    Folder,
  },
  data() {
    return {
      examId: null,
      password: "",
      startDate: "",
      endDate: "",
    };
  },
  methods: {
    async createExamination() {
      const response = await this.$store.dispatch(
        "examination/createExamination",
        {
          examId: this.examId,
          password: this.password,
          startDate: this.startDate,
          endDate: this.endDate,
        }
      );

      alert(`${response.status}: ${response.messages}`);
    },
    async updateExamination() {
      const response = await this.$store.dispatch(
        "examination/updateExamination",
        {
          examId: this.examId,
          password: this.password,
          startDate: this.startDate,
          endDate: this.endDate,
        }
      );

      alert(`${response.status}: ${response.messages}`);
    },
    async addInvitedStudent() {
      const response = await this.$store.dispatch(
        "meeting/addInvitedStudent",
        this.invitedStudent
      );

      alert(response);
      // this.invitedStudent = response;
    },
  },
};
</script>

<style></style>
