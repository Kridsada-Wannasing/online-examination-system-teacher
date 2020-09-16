<template>
  <div class="h-100">
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="4">
        <span class="color-dark-blue" style="font-size: 12px;"
          >ประเภทการสอบ</span
        >
        <v-select
          solo
          rounded
          filled
          dense
          :items="droupdownItems"
          label="ex. 1234545678"
          hide-details
        ></v-select>
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="4">
        <span class="color-dark-blue" style="font-size: 12px;">ปีการศึกษา</span>
        <v-text-field
          solo
          placeholder="ex. 1234567"
          filled
          rounded
          dense
          hide-details
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="4">
        <span class="color-dark-blue" style="font-size: 12px;"
          >ภาคการศึกษา</span
        >
        <v-text-field
          solo
          placeholder="ex. 1234567"
          filled
          rounded
          dense
          hide-details
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="4">
        <span class="color-dark-blue" style="font-size: 12px;"
          >รูปแบบการสอน</span
        >
        <v-select
          solo
          rounded
          filled
          dense
          :items="droupdownItems"
          label="วิชา"
        ></v-select>
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="4">
        <span class="color-dark-blue" style="font-size: 12px;"
          >สิทธิ์การเข้าถึง</span
        >
        <v-text-field
          solo
          placeholder="ex. 1234567"
          filled
          rounded
          dense
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="4">
        <span class="color-dark-blue" style="font-size: 12px;"
          >ชื่อชุดข้อสอบ</span
        >
        <v-text-field
          solo
          placeholder="ex. 1234567"
          filled
          rounded
          dense
        ></v-text-field>
      </v-col>
    </v-row>
    <div class="mt-5 mb-10" style="display: flex; justify-content: flex-end;">
      <v-btn rounded color="#6dc449" small style="width: 150px" dark
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
        >ยกเลิก</v-btn
      >
    </div>
  </div>
</template>
<script>
export default {
  name: "typeExam",
  components: {},
  data: () => ({
    droupdownItems: ["Foo", "Bar", "Fizz", "Buzz"]
  })
};
</script>
