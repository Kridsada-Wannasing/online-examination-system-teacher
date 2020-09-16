<template>
  <div>
    <v-card class="mx-auto pa-5" style="border-radius: 20px;" outlined>
      <h4 class="color-dark-blue">เพิ่มข้อสอบ</h4>
      <v-row>
        <v-col cols="12" sm="6" md="4" lg="4">
          <v-select
            solo
            rounded
            filled
            dense
            label="ประเภทข้อสอบ"
            hide-details
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="4">
          <v-text-field
            solo
            rounded
            dense
            filled
            label="Tag"
            append-icon="mdi-plus"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="4">
          <v-select
            solo
            rounded
            filled
            dense
            label="ระดับความยาก"
            hide-details
          ></v-select>
        </v-col>
      </v-row>
      <div>
        <ListCode />
      </div>
      <div class="mt-10" style="display: flex; justify-content: space-between;">
        <div style="display: flex; justify-content: space-between;">
          <span class="pr-4">2.)</span>
          <div
            class="pa-4 border-color-dark-blue mr-4"
            style="border: 1px solid; border-radius: 20px"
          >
            Lorem ipsum dolor sit amet, ... Lorem ipsum dolor sit amet, ...
            Lorem ipsum dolor sit amet, ... Lorem ipsum dolor sit amet, ...
            Lorem ipsum dolor sit amet, ...
          </div>
        </div>
        <v-btn outlined color="primary" small dark>
          <v-icon v-text="'mdi-paperclip'" small class="color-blue"></v-icon
          >Upload file
        </v-btn>
      </div>

      <v-row class="mt-7">
        <v-col cols="12" sm="12" md="6" lg="6">
          <div
            class="mb-4"
            v-for="(item, i) in items"
            :key="i"
            style="display: flex; justify-content: space-between;"
          >
            <v-card
              class="px-2 py-2"
              style="min-width: 150px; border-radius: 20px;"
            >
              <v-checkbox
                class="ma-0 mb-1"
                hide-details
                v-model="allowSpaces"
                :label="item"
              ></v-checkbox>
            </v-card>
            <v-icon class="mr-5" v-text="'mdi-delete-outline'" small></v-icon>
          </div>
        </v-col>
        <v-col
          cols="12"
          sm="12"
          md="6"
          lg="6"
          style="border-left: 1px solid #d4d4d4;"
          class="px-10"
        >
          <div class="text-center">
            <v-select
              class="mb-3"
              solo
              rounded
              filled
              dense
              label="ข้อเดียว"
              hide-details
            ></v-select>

            <v-select
              solo
              rounded
              filled
              dense
              label="ระดับคะแนน"
              hide-details
            ></v-select>
          </div>
        </v-col>
      </v-row>
      <div class="mt-5" style="display: flex; justify-content: center;">
        <v-btn rounded color="#6dc449" style="width: 150px" dark>บันทึก</v-btn>
        <v-btn
          class="ml-4"
          outlined
          rounded
          color="red"
          style="width: 150px"
          dark
          >ลบข้อสอบ</v-btn
        >
      </div>

      <div class="mt-5">
        <v-card
          class="mx-auto color-dark-blue pa-4 text-center"
          style="font-size: 12px; border-radius: 20px; min-height: 220px; max-height: 220px;"
          outlined
        >
          <img
            src="@/assets/icon/plus.svg"
            width="50px"
            style="margin-top: 66px;"
          />
        </v-card>
      </div>
    </v-card>
    <!-- <v-row>
      <v-col cols="12" sm="6" md="4" lg="4">
        <v-select solo rounded filled dense :items="droupdownItems" label="วิชา"></v-select>
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="4">
        <v-select solo rounded filled dense :items="droupdownItems" label="ชุดข้อสอบ"></v-select>
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="4">
        <v-select solo rounded filled dense :items="droupdownItems" label="การสอบ"></v-select>
      </v-col>
    </v-row>-->

    <!-- <v-card class="mx-auto pa-5" style="border-radius: 20px;" outlined>
      <div class="pb-5" style="display: flex; justify-content: space-between;">
        <h3 class="color-dark-blue">ชุดข้อสอบ</h3>
        <v-btn small outlined color="primary" @click="status = !status">
          <v-icon left>mdi-plus</v-icon>เพิ่มชุดข้อสอบ
        </v-btn>
      </div>
      <div style="display: flex;">
        <v-row no-gutters>
          <v-col class="mb-2" v-for="(item, i) in items" :key="i">
            <Folder
              class="mr-2"
              :color="item.color"
              :title="item.title"
              :classId="item.classId"
              :code="item.code"
              :date="item.date"
              :sector="item.sector"
            />
          </v-col>
          <v-col class="mb-2">
            <Folder class="mr-2" color="plus" />
          </v-col>
        </v-row>
      </div>
    </v-card>-->
  </div>
</template>
<script>
import ListCode from "@/components/ListCode";
export default {
  name: "addExam",
  components: {
    ListCode
  },
  data: () => ({
    items: ["Test 1", "Test 2", "Test 3", "Test 4"]
  })
};
</script>
