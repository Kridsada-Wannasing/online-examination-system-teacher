<template>
  <div>
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="4">
        <v-select
          solo
          rounded
          filled
          dense
          label="วิชา"
          hide-details
        ></v-select>
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="4">
        <v-select
          solo
          rounded
          filled
          dense
          label="กลุ่มเรียน"
          hide-details
        ></v-select>
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="4">
        <v-select
          solo
          rounded
          filled
          dense
          label="ชุดข้อสอบ"
          hide-details
        ></v-select>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  name: "filterClass"
};
</script>
