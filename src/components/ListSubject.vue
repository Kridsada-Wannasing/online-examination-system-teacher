<template>
  <div class="h-100 w-100">
    <v-card
      class="pa-10 h-100 w-100"
      style="border-radius: 20px; display: inline-table;"
      outlined
    >
      <div style="height: 10%; display: flex; justify-content: space-between;">
        <h3 class="color-dark-blue">รายวิชา</h3>
        <v-btn small outlined color="primary" @click="changeStatus">
          <v-icon left>mdi-plus</v-icon>เพิ่มวิชา
        </v-btn>
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
            <div
              class="ma-0 pa-0"
              style="cursor:pointer;"
              @click="showSubjectDialog(subject)"
            >
              <Folder
                :subject="subject"
                :color="i % 2 == 0 ? 'green' : 'blue'"
              />
            </div>
          </v-col>
          <SubjectDialog
            :dialog="dialog"
            :subject="subject"
            @showDialog="getDialog"
          />
        </v-row>
      </div>
    </v-card>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Folder from "./Folder";
import SubjectDialog from "../components/SubjectDialog";
export default {
  name: "listClass",
  props: {
    status: Boolean
  },
  data() {
    return {
      dialog: false,
      subject: {}
    };
  },
  components: {
    Folder,
    SubjectDialog
  },
  computed: {
    ...mapState("subject", ["subjects"])
  },
  methods: {
    changeStatus() {
      this.$emit("changeStatus", !this.status);
    },
    getDialog(event) {
      this.dialog = event;
    },
    showSubjectDialog(subject) {
      this.subject = Object.assign({}, subject);
      this.dialog = true;
    }
  }
};
</script>
