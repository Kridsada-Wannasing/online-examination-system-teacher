<template>
  <v-card class="mx-auto pa-10 h-100" style="border-radius: 20px;" outlined>
    <div class="ma-0 pa-0">
      <h3 class="color-dark-blue pb-2">เพิ่มรายวิชา</h3>
    </div>
    <hr class="mb-4" />
    <div>
      <v-row>
        <v-col cols="12" sm="6" md="4" lg="4">
          <span class="color-dark-blue" style="font-size: 12px;">รหัสวิชา</span>
          <v-text-field
            placeholder="ใส่รหัสวิชา"
            filled
            rounded
            dense
            hide-details
            v-model="subjectId"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="4">
          <span class="color-dark-blue" style="font-size: 12px;">ชื่อวิชา</span>
          <v-text-field
            placeholder="ใส่ชื่อวิชา"
            filled
            rounded
            dense
            hide-details
            v-model="subjectName"
          ></v-text-field>
        </v-col>
      </v-row>
    </div>
    <div class="mt-15" style="display: flex; justify-content: flex-end;">
      <v-btn
        rounded
        color="#6dc449"
        small
        style="width: 150px"
        dark
        @click="createSubject"
        >บันทึก</v-btn
      >
      <v-btn
        class="ml-4"
        outlined
        rounded
        color="red"
        small
        style="width: 150px"
        dark
        @click="cancel"
        >ยกเลิก</v-btn
      >
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    status: Boolean,
  },
  data: () => ({
    subjectId: null,
    subjectName: "",
  }),
  methods: {
    async createSubject() {
      if (!this.subjectId) return alert("กรุณาใส่รหัสวิชา");
      else if (this.subjectId.length > 8)
        return alert("ใส่รหัสวิชาไม่เกิน 8 ตัวอักษร");

      if (!this.subjectName) return alert("กรุณาใส่ชื่อวิชา");
      else if (this.subjectName.length > 50)
        return alert("ใส่ชื่อวิชาไม่เกิน 50 ตัวอักษร");

      try {
        const response = await this.$store.dispatch("subject/createSubject", {
          subjectId: this.subjectId,
          subjectName: this.subjectName,
        });

        alert(`${response.status}: ${response.message}`);
        this.cancel();
      } catch (error) {
        alert(error.response.data.message);
      }
    },
    cancel() {
      this.subjectId = null;
      this.subjectName = "";
      this.$emit("changeStatus", !this.status);
    },
  },
};
</script>

<style></style>
