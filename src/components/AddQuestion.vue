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
            :item="types"
            v-model="questionType"
            label="ประเภทคำถาม"
            hide-details
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="4">
          <v-text-field
            solo
            rounded
            dense
            filled
            :item="tags"
            v-model="tag"
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
            :items="levelItems"
            v-model="level"
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
          <v-textarea
            class="pa-4 border-color-dark-blue mr-4"
            style="border: 1px solid; border-radius: 20px"
          >
            <!-- Lorem ipsum dolor sit amet, ... Lorem ipsum dolor sit amet, ...
            Lorem ipsum dolor sit amet, ... Lorem ipsum dolor sit amet, ...
            Lorem ipsum dolor sit amet, ... -->
          </v-textarea>
        </div>
        <v-btn outlined color="primary" small dark>
          <v-icon v-text="'mdi-paperclip'" small class="color-blue"></v-icon
          >Upload Image
        </v-btn>
      </div>

      <v-row class="mt-7">
        <v-col cols="12" sm="12" md="6" lg="6">
          <div
            class="mb-4"
            v-for="(choice, i) in choices"
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
                v-model="answer"
                :label="choice"
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
  </div>
</template>
<script>
import ListCode from "@/components/ListCode";
export default {
  name: "addQuestion",
  components: {
    ListCode,
  },
  data: () => ({
    items: ["Test 1", "Test 2", "Test 3", "Test 4"],
    types: ["ปรนัย", "อัตนัย"],
    levelItems: [1, 2, 3, 4, 5],
    questionType: "",
    tagOfQuestion: [],
    level: null,
    question: "",
    choices: [
      { choice: "ตัวเลือกที่ 1" },
      { choice: "ตัวเลือกที่ 2" },
      { choice: "ตัวเลือกที่ 3" },
      { choice: "ตัวเลือกที่ 4" },
    ],
  }),
  methods: {
    createQuestion() {
      this.$store.dispatch("question/createQuestion", {
        questionType: this.types,
        question: this.question,
        level: this.level,
      });
    },
    addChoice() {
      this.choices.push({
        choice: `ตัวเลือกที่ ${this.choices.length}`,
      });
    },
    subChoice() {},
  },
  // created() {
  //   this.$store.dispatch('tag/getTagsInQuestion')
  // }
};
</script>
