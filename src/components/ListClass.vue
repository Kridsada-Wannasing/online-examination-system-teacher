<template>
  <div class="h-100 w-100">
    <v-card
      class="pa-10 h-100 w-100"
      style="border-radius: 20px; display: inline-table;"
      outlined
    >
      <div style="height: 10%; display: flex; justify-content: space-between;">
        <h3 class="color-dark-blue">รายวิชา</h3>
      </div>
      <div class="mt-10" style="height: 70%; max-height: 70%; overflow: auto;">
        <v-row no-gutters class="h-100">
          <v-col
            cols="12"
            lg="4"
            md="6"
            sm="6"
            xs="12"
            class="h-100 mb-5"
            v-for="(subject, i) in subjects"
            :key="i"
          >
            <Folder :subject="subject" :color="i % 2 == 0 ? 'green' : 'blue'" />
          </v-col>
          <v-col class="h-100 mb-5" cols="12" lg="4" md="6" sm="6" xs="12">
            <Folder color="plus" />
          </v-col>
        </v-row>
      </div>
    </v-card>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Folder from "./Folder";
export default {
  name: "listClass",
  components: {
    Folder,
  },
  computed: {
    ...mapState("subject", ["subjects"]),
  },
  mounted() {
    this.$store.dispatch("subject/getAllSubjects");
  },
};
</script>
