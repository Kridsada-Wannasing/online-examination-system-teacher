<template>
  <div>
    <v-card class="mx-auto pa-5" style="border-radius: 20px;" outlined>
      <h4 class="color-dark-blue">เพิ่มคำถาม</h4>
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
            v-model="tagsOfQuestion"
            label="Tag"
            append-icon="mdi-plus"
            hide-details
            @click:append="manageTag"
          >
          </v-select>
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
      <div v-if="image">
        <v-img :src="image" max-width="700"></v-img>
      </div>
      <div class="mt-10" style="display: flex; justify-content: space-between;">
        <div style="display: flex; justify-content: space-between;">
          <span class="pr-4">{{ countQuestions + 1 }})</span>
          <v-textarea
            outlined
            rounded
            class="pa-4 border-color-dark-blue mr-4"
            cols="50"
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

      <v-row class="mt-7" v-if="questionType !== ''">
        <v-col cols="12" sm="12" md="6" lg="6" v-if="questionType === 'ปรนัย'">
          <div
            style="display: flex; justify-content: space-between;"
            class="mb-5 mr-5 mt-0 pt-0"
          >
            <span class="mt-0 pt-0">คำตอบ</span>
          </div>
          <div
            v-for="(choice, i) in choices"
            :key="i"
            style="display: flex; justify-content: space-between;"
          >
            <v-checkbox
              class="ma-0 mb-1 ml-3"
              hide-details
              :value="(choice.order = i + 1)"
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
              class="mr-5 mb-5"
              v-text="'mdi-delete-outline'"
              @click="subChoice(i)"
            ></v-icon>
          </div>
          <div class="mx-10">
            <v-btn outlined rounded @click="addChoice"
              ><v-icon left>mdi-plus</v-icon>เพิ่มตัวเลือก</v-btn
            >
          </div>
        </v-col>
        <v-col
          cols="12"
          sm="12"
          md="6"
          lg="6"
          v-else-if="questionType === 'อัตนัย'"
        >
          <div
            v-for="(answer, i) in subjectiveAnswers"
            :key="i"
            style="display: flex; justify-content: space-between;"
          >
            <v-text-field
              class="px-2 my-0"
              background-color="white"
              rounded
              v-model="answer.answer"
              outlined
              filled
              dense
            >
            </v-text-field>
            <v-icon
              class="mr-5 mb-5"
              v-text="'mdi-delete-outline'"
              @click="subChoice(i)"
            ></v-icon>
          </div>
          <div class="mx-10">
            <v-btn outlined rounded @click="addChoice"
              ><v-icon left>mdi-plus</v-icon>เพิ่มคำตอบ</v-btn
            >
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
      <TagDialog :dialog="dialog" @emittedDialog="getDialog" />
    </v-card>
  </div>
</template>
<script>
import { mapState } from "vuex";
import TagDialog from "./TagDialog";

export default {
  name: "addQuestion",
  props: {
    examId: Number,
    addQuestion: Boolean,
    countQuestions: Number,
  },
  components: {
    TagDialog,
  },
  data: () => ({
    dialog: false,
    types: ["ปรนัย", "อัตนัย"],
    levelItems: [1, 2, 3, 4, 5],
    questionType: "ปรนัย",
    tagsOfQuestion: [],
    level: null,
    question: "",
    choices: [
      { choice: "ตัวเลือกที่ 1", order: 0 },
      { choice: "ตัวเลือกที่ 2", order: 0 },
      { choice: "ตัวเลือกที่ 3", order: 0 },
      { choice: "ตัวเลือกที่ 4", order: 0 },
    ],
    selectedFile: null,
    isSelecting: false,
    defaultButtonText: "อัพโหลดรูปภาพ",
    score: null,
    subjectiveAnswers: [{ answer: "คำตอบที่ 1" }, { answer: "คำตอบที่ 2" }],
    answers: [],
    image: "",
  }),
  methods: {
    getDialog(event) {
      this.dialog = event;
    },
    async createQuestion() {
      try {
        let numberOfAnswer;

        if (
          this.tagsOfQuestion === undefined ||
          this.tagsOfQuestion.length == 0
        ) {
          return alert("กรูณาใส่ป้ายระบุ(tag)");
        }

        if (!this.level) {
          return alert("กรูณาเลือกระดับความยาก");
        }

        if (!this.question) {
          return alert("กรูณาใส่คำถาม");
        }

        if (this.questionType == "ปรนัย") {
          if (this.choices == undefined || this.choices.length == 0) {
            return alert("กรุณาใส่ตัวเลือก");
          }
          if (this.answers === undefined || this.answers.length == 0) {
            return alert("กรุณาเลือกคำตอบ");
          } else numberOfAnswer = this.answers.length;
        }

        if (this.questionType == "อัตนัย") {
          if (
            this.subjectiveAnswers === undefined ||
            this.subjectiveAnswers.length == 0
          ) {
            return alert("กรุณาใส่คำตอบ");
          } else numberOfAnswer = this.subjectiveAnswers.length;
        }

        if (!this.score) {
          return alert("กรูณาใส่คะแนน");
        }

        const response = await this.$store.dispatch("question/createQuestion", {
          questionType: this.questionType,
          question: this.question,
          examId: this.$route.params.examId,
          level: this.level,
          numberOfAnswer: numberOfAnswer,
          sumScoreQuestion: this.score,
        });

        if (this.questionType == "อัตนัย") {
          this.createAnswers(response.data.newQuestion.questionId);
        } else {
          this.createChoices(response.data.newQuestion.questionId);
          this.createAnswers(response.data.newQuestion.questionId);
        }

        this.addTagToQuestion(response.data.newQuestion.questionId);

        if (this.selectedFile)
          this.createImageInQuestion(response.data.newQuestion.questionId);
        else {
          this.cancel();
        }

        alert(`${response.status}: ${response.data.message}`);
        this.cancel();
      } catch (error) {
        alert(error);
      }
    },
    createAnswers(questionId) {
      if (this.questionType == "ปรนัย") {
        this.$store.dispatch(
          "answer/createAnswers",
          this.answers.map((element) => ({
            answer: element,
            score: this.score / this.answers.length,
            questionId,
          }))
        );
      } else {
        this.$store.dispatch(
          "answer/createAnswers",
          this.subjectiveAnswers.map((element) => ({
            ...element,
            score: this.score / this.subjectiveAnswers.length,
            questionId,
          }))
        );
      }
    },
    addTagToQuestion(questionId) {
      this.$store.dispatch(
        "tag/addTagToQuestion",
        this.tagsOfQuestion.map((element) => ({
          tagId: element,
          questionId,
        }))
      );
    },
    createChoices(questionId) {
      this.$store.dispatch(
        "choice/createChoices",
        this.choices.map((element) => {
          return { ...element, questionId };
        })
      );
    },
    createImageInQuestion(questionId) {
      const formData = new FormData();
      formData.append("file", this.selectedFile, this.selectedFile.name);
      formData.append("questionId", questionId);

      this.$store.dispatch("image/uploadImage", formData);
    },
    addChoice() {
      if (this.questionType == "ปรนัย") {
        this.choices.push({
          choice: `ตัวเลือกที่ ${this.choices.length + 1}`,
          order: 0,
        });
      } else {
        this.subjectiveAnswers.push({
          answer: `คำตอบที่ ${this.subjectiveAnswers.length + 1}`,
        });
      }
    },
    subChoice(index) {
      if (this.questionType == "ปรนัย") {
        this.choices.splice(index, 1);
        this.answers = [];
      } else this.subjectiveAnswers.splice(index, 1);
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

      if (this.selectedFile.size > 104857600) {
        return alert("รูปภาพต้องมีขนาดไม่เกิน 100MB");
      }

      this.image = URL.createObjectURL(this.selectedFile);
    },
    manageTag() {
      this.dialog = !this.dialog;
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
  },
};
</script>
