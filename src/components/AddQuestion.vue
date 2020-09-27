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
            :items="types"
            v-model="questionType"
            label="ประเภทคำถาม"
            hide-details
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="4">
          <v-select
            solo
            rounded
            dense
            filled
            multiple
            :items="tags"
            :item-text="'tagName'"
            :item-value="'tagId'"
            v-model="tagOfQuestion"
            label="Tag"
            append-icon="mdi-plus"
            hide-details
            @click:append-icon="manageTag"
          ></v-select>
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
      <!-- <div>
        <ListCode />
      </div> -->
      <div v-if="image">
        <v-img :src="image"></v-img>
      </div>
      <div class="mt-10" style="display: flex; justify-content: space-between;">
        <div style="display: flex; justify-content: space-between;">
          <span class="pr-4">{{ this.choices.length + 1 }})</span>
          <v-textarea
            outlined
            rounded
            class="pa-4 border-color-dark-blue mr-4"
            v-model="question"
          >
          </v-textarea>
        </div>
        <v-btn
          color="primary"
          class="text-none"
          outlined
          small
          dark
          :loading="isSelecting"
          @click="onButtonClick"
        >
          <v-icon
            left
            v-text="'mdi-paperclip'"
            small
            class="color-blue"
          ></v-icon
          >{{ buttonText }}
        </v-btn>
        <input
          ref="uploader"
          class="d-none"
          type="file"
          accept="image/*"
          @change="onFileChanged"
        />
      </div>

      <v-row class="mt-7">
        <v-col cols="12" sm="12" md="6" lg="6">
          <div
            class="mb-4"
            v-for="(choice, i) in choices"
            :key="i"
            style="display: flex; justify-content: space-between;"
          >
            <v-checkbox
              class="ma-0 mb-1"
              hide-details
              :value="choice.order"
              v-model="answers"
            ></v-checkbox>
            <v-text-field
              class="px-2 my-0"
              background-color="white"
              rounded
              v-model="choices[i].choice"
              outlined
              filled
              dense
            >
            </v-text-field>
            <v-icon
              class="mr-5"
              v-text="'mdi-delete-outline'"
              @click="subChoice(i)"
            ></v-icon>
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
            <!-- <v-select
              class="mb-3"
              solo
              rounded
              filled
              dense
              label="ข้อเดียว"
              hide-details
            ></v-select> -->

            <v-text-field
              class="mx-8"
              solo
              rounded
              filled
              dense
              label="คะแนน"
              v-model="score"
              hide-details
            ></v-text-field>
          </div>
        </v-col>
      </v-row>
      <div class="mt-5" style="display: flex; justify-content: center;">
        <v-btn
          rounded
          color="#6dc449"
          style="width: 150px"
          @click="createQuestion"
          dark
          >บันทึก</v-btn
        >
        <v-btn
          class="ml-4"
          outlined
          rounded
          color="red"
          style="width: 150px"
          dark
          @click="cancel"
          >ยกเลิก</v-btn
        >
      </div>

      <!-- <div class="mt-5">
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
      </div> -->
    </v-card>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "addQuestion",
  props: {
    examId: Number,
    addQuestion: Boolean,
  },
  data: () => ({
    types: ["ปรนัย", "อัตนัย"],
    levelItems: [1, 2, 3, 4, 5],
    questionType: "",
    tagOfQuestion: [],
    level: null,
    question: "",
    choices: [
      { choice: "ตัวเลือกที่ 1", order: 1 },
      { choice: "ตัวเลือกที่ 2", order: 2 },
      { choice: "ตัวเลือกที่ 3", order: 3 },
      { choice: "ตัวเลือกที่ 4", order: 4 },
    ],
    selectedFile: null,
    isSelecting: false,
    defaultButtonText: "UPLOAD IMAGE",
    score: null,
    answers: [],
    image: "",
  }),
  methods: {
    async createQuestion() {
      let question = {
        questionType: this.questionType,
        question: this.question,
        examId: this.examId,
        level: this.level,
      };
      let answers = await this.mapAnswers();
      let choices = this.choices;
      let tags = this.mapTags();

      const response = await this.$store.dispatch("question/createQuestion", {
        question,
        answers,
        choices,
        tags,
      });

      if (this.selectedFile) this.createImageInQuestion(response.questionId);
      else {
        if (response) alert("สร้างคำถามสำเร็จ");
        this.cancel();
      }
    },
    mapAnswers() {
      let answers = this.answers.map((element) => ({
        answer: element,
        score: this.score,
      }));
      return answers;
    },
    mapTags() {
      let tags = this.tagOfQuestion.map((element) => ({
        tagId: element,
      }));
      return tags;
    },
    createImageInQuestion(questionId) {
      const formData = new FormData();
      formData.append("file", this.selectedFile, this.selectedFile.name);
      formData.append("questionId", questionId);

      this.$store
        .dispatch("image/uploadImage", formData)
        .then(() => alert("สร้างคำถามสำเร็จ"));
    },
    addChoice() {
      this.choices.push({
        choice: `ตัวเลือกที่ ${this.choices.length + 1}`,
        order: this.choices.length + 1,
      });
    },
    subChoice(index) {
      this.choices.splice(index, 1);
    },
    onButtonClick() {
      this.isSelecting = true;
      window.addEventListener(
        "focus",
        () => {
          this.isSelecting = false;
        },
        { once: true }
      );

      this.$refs.uploader.click();
    },
    onFileChanged(e) {
      this.selectedFile = e.target.files[0];
      this.image = URL.createObjectURL(this.selectedFile);
    },
    manageTag() {
      console.log("this is plus");
    },
    cancel() {
      this.$emit("cancel", !this.addQuestion);
    },
  },
  computed: {
    ...mapState("tag", ["tags"]),
    buttonText() {
      return this.selectedFile
        ? this.selectedFile.name
        : this.defaultButtonText;
    },
  },
  created() {
    this.$store.dispatch("tag/getAllTags");
    console.log(this.examId);
    console.log(this.addQuestion);
  },
};
</script>
