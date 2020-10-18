<template>
  <div>
    <v-btn
      dark
      color="primary"
      class="mr-4"
      small
      @click.stop="addInvitedStudent"
    >
      <v-icon left small>mdi-account-plus-outline</v-icon>เพิ่มรายชื่อ
    </v-btn>
    <v-dialog v-model="dialog" max-width="900">
      <v-card class="rounded-lg">
        <v-row>
          <v-col>
            <v-data-table
              v-model="selectedStudent"
              :headers="headers"
              :items="students"
              class="elevation-0"
              item-key="studentId"
              show-select
            >
              <template v-slot:top>
                <v-toolbar flat color="white" class="rounded-xl mx-0">
                  <h3 class="color-dark-blue">
                    เพิ่มรายชื่อสำหรับนัดหมายการสอบ
                  </h3>
                  <v-spacer></v-spacer>
                  <v-btn
                    small
                    outlined
                    color="success"
                    dark
                    class="mb-2 mr-2"
                    @click="save"
                    >เพิ่มรายชื่อ</v-btn
                  >
                  <v-btn
                    small
                    outlined
                    color="warning"
                    dark
                    class="mb-2 mr-2"
                    @click="cancel"
                    >ยกเลิก</v-btn
                  >
                </v-toolbar>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    dialog: Boolean,
    examId: [Number, String],
    studentId: [Number, String],
  },
  data() {
    return {
      score: null,
    };
  },
  watch: {
    examId() {
      this.$store.dispatch(
        "examination/getExamLogOfQuestion",
        this.examId,
        this.studentId
      );
    },
  },
  computed: {
    ...mapState("eamination", ["examLog"]),
  },
  methods: {
    initialize() {
      this.score = this.object.score;
    },
  },
};
</script>

<style></style>
