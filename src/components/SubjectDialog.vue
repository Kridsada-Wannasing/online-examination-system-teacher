<template>
  <v-dialog v-model="dialog" max-width="500" persistent scrollable>
    <v-card>
      <v-card-title>
        <span class="headline">แก้ไขรายวิชา</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <!-- <v-col cols="12">
              <v-text-field
                label="รหัสวิชา"
                v-model="subjectData.subjectId"
              ></v-text-field>
            </v-col> -->
            <v-col cols="12">
              <v-text-field
                label="ชื่อวิชา"
                v-model="subjectData.subjectName"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <!-- <v-btn color="red" text @click="deleteSubject">
          ลบรายวิชา
        </v-btn> -->
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="updateSubject">
          บันทึก
        </v-btn>
        <v-btn color="blue darken-1" text @click="cancel">
          ยกเลิก
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    dialog: Boolean,
    subject: Object,
  },
  data: () => ({
    subjectData: {
      subjectId: null,
      subjectName: "",
    },
  }),
  watch: {
    subject() {
      this.subjectData = this.subject;
    },
  },
  methods: {
    async updateSubject() {
      try {
        const response = await this.$store.dispatch(
          "subject/updateSubject",
          this.subjectData,
          this.subject.subjectId
        );

        alert(`${response.status}: ${response.message}`);
        this.cancel();
      } catch (error) {
        alert(error.response.data.message);
      }
    },
    deleteSubject() {
      confirm("คุณต้องการลบรายวิชานี้หรือไม่") &&
        this.$store
          .dispatch("subject/deleteSubject", this.subject.subjectId)
          .then(() => {
            alert("ลบรายวิชานี้เรียบร้อย");
            this.cancel();
          })
          .catch((error) => alert(error.response.data.message));
    },
    cancel() {
      this.$emit("showDialog", false);
    },
  },
};
</script>

<style></style>
