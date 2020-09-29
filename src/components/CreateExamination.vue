<template>
  <div>
    <v-row>
      <v-col>
        <v-card></v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card v-if="true"></v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
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
