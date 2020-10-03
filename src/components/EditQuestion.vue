<template>
  <div>
    <div
      v-if="isEditingQuestion"
      @click="editingQuestion"
      style="cursor:pointer;"
    >
      <v-card
        class="mx-auto color-dark-blue pa-4"
        style="font-size: 12px; border-radius: 20px; min-height: 220px; max-height: 220px;"
        outlined
      >
        <p>{{ question.question }}</p>
        <p class="my-1" v-for="(choice, j) in question.Choices" :key="j">
          {{ choice.choice }}
        </p>
      </v-card>
    </div>
    <div v-else>
      <v-card class="mx-auto pa-5" style="border-radius: 20px;" outlined>
        <h4 class="color-dark-blue">เพิ่มคำถาม</h4>
        <v-row>
          <!-- <v-col cols="12" sm="6" md="4" lg="4">
            <v-select
              solo
              rounded
              filled
              dense
              :items="types"
              v-model="defaultQuestion.questionType"
              label="ประเภทคำถาม"
              hide-details
            ></v-select>
          </v-col> -->
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
              v-model="defaultTagsOfQuestion"
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
              v-model="defaultQuestion.level"
              label="ระดับความยาก"
              hide-details
            ></v-select>
          </v-col>
        </v-row>
        <div v-if="defaultImage || image.path !== undefined">
          <v-img
            v-if="image.path"
            :src="`http://localhost:8000/static/${image.path}`"
            max-width="700"
          ></v-img>
          <v-img v-else :src="defaultImage" max-width="700"></v-img>
        </div>
        <div
          class="mt-10"
          style="display: flex; justify-content: space-between;"
        >
          <div style="display: flex; justify-content: space-between;">
            <span class="pr-4">{{ index }})</span>
            <v-textarea
              outlined
              rounded
              class="pa-4 border-color-dark-blue mr-4"
              cols="50"
              v-model="defaultQuestion.question"
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

        <v-row class="mt-7" v-if="defaultQuestion.questionType !== ''">
          <v-col
            cols="12"
            sm="12"
            md="6"
            lg="6"
            v-if="defaultQuestion.questionType === 'ปรนัย'"
          >
            <div
              v-for="(choice, i) in defaultChoices"
              :key="i"
              style="display: flex; justify-content: space-between;"
            >
              <v-checkbox
                class="ma-0 mb-1"
                hide-details
                :value="i + 1"
                v-model="defaultAnswers"
              ></v-checkbox>
              <v-text-field
                class="px-2 my-0"
                background-color="white"
                rounded
                v-model="defaultChoices[i].choice"
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
            v-else-if="defaultChoices.questionType === 'อัตนัย'"
          >
            <div
              class="mb-4"
              v-for="(answer, i) in defaultAnswers"
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
            @click="updateQuestion"
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
  </div>
</template>
<script>
import { mapState } from "vuex";
import TagDialog from "./TagDialog";
export default {
  name: "editQuestion",
  components: {
    TagDialog,
  },
  props: {
    question: Object,
    index: Number,
  },
  data: () => ({
    edited: false,
    dialog: false,
    types: ["ปรนัย", "อัตนัย"],
    levelItems: [1, 2, 3, 4, 5],
    subjectiveAnswers: [{ answer: "คำตอบที่ 1" }, { answer: "คำตอบที่ 2" }],
    defaultTagsOfQuestion: [],
    defaultQuestion: {
      question: "",
      questionType: "",
      level: null,
    },
    choices: [
      { choice: "ตัวเลือกที่ 1", order: 0 },
      { choice: "ตัวเลือกที่ 2", order: 0 },
      { choice: "ตัวเลือกที่ 3", order: 0 },
      { choice: "ตัวเลือกที่ 4", order: 0 },
    ],
    defaultChoices: [],
    deletedChoices: [],
    deletedTagsInQuestion: [],
    deletedAnswer: [],
    selectedFile: null,
    isSelecting: false,
    defaultButtonText: "UPLOAD IMAGE",
    score: null,
    defaultAnswers: [],
    defaultImage: "",
  }),
  watch: {
    defaultAnswers() {
      console.log(this.defaultAnswers);
    },
  },
  methods: {
    async updateQuestion() {
      if (this.answers === undefined || this.answers.length == 0) {
        return alert("กรูณาใส่คำตอบ");
      }

      // if (
      //   this.questionType == "ปรนัย" &&
      //   (this.choices == undefined || this.choices.length == 0)
      // ) {
      //   return alert("กรุณาใส่ตัวเลือก");
      // }

      if (
        this.defaultTagsOfQuestion === undefined ||
        this.defaultTagsOfQuestion.length == 0
      ) {
        return alert("กรูณาใส่ป้ายระบุ(tag)");
      }

      if (this.questionType == "อัตนัย") {
        this.editAnswers();
      } else {
        this.editChoices();
        this.editAnswers();
      }

      this.addTagToQuestion();

      const updatedQuestion = await this.$store.dispatch(
        "question/editQuestion",
        {
          questionId: this.question.questionId,
          // questionType: this.defaultQuestion.types,
          question: this.defaultQuestion.question,
          level: this.defaultQuestion.level,
        }
      );

      if (this.selectedFile.name != this.image.name) this.changeImage();
      else {
        if (updatedQuestion)
          alert(`${updatedQuestion.status}: ${updatedQuestion.message}`);
        this.cancel();
      }
    },
    async editChoices() {
      const updatedChoices = await this.$store.dispatch("choice/editChoices", {
        questionId: this.questionId,
        choices: this.choices,
      });

      alert(`${updatedChoices.status}: ${updatedChoices.message}`);
    },
    async editAnswers() {
      const updatedAnswers = await this.$store.dispatch("answer/editAnswers", {
        questionId: this.questionId,
        answers: this.mapAnswers(),
      });

      alert(`${updatedAnswers.status}: ${updatedAnswers.message}`);
    },
    async editTags() {
      const updatedTags = await this.$store.dispatch("tag/editTags", {
        questionId: this.questionId,
        tags: this.mapTags(),
      });

      alert(`${updatedTags.status}: ${updatedTags.message}`);
    },
    mapAnswers() {
      let answers = this.answers.map((element) => ({
        answer: element,
        score: this.score / this.answers.length,
      }));
      return answers;
    },
    mapTags() {
      let tags = this.tagOfQuestion.map((element) => ({
        tagId: element,
      }));
      return tags;
    },
    changeImage() {
      const formData = new FormData();
      formData.append("file", this.selectedFile, this.selectedFile.name);
      formData.append("questionId", this.questionId);

      this.$store
        .dispatch("image/changeImage", formData)
        .then(() => alert("เปลี่ยนรูปภาพสำเร็จ"));
    },
    addChoice() {
      if (this.questionType == "ปรนัย") {
        this.choices.push({
          choice: `ตัวเลือกที่ ${this.choices.length + 1}`,
        });
      } else {
        this.subjectiveAnswers.push({
          answer: `คำตอบที่ ${this.choices.length + 1}`,
        });
      }
    },
    subChoice(index) {
      if (this.questionType == "ปรนัย") {
        this.choices.splice(index, 1);
        this.defaultAnswers = [];
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
    getDialog(event) {
      this.dialog = event;
    },
    onFileChanged(e) {
      this.selectedFile = e.target.files[0];
      this.defaultImage = URL.createObjectURL(this.selectedFile);
    },
    manageTag() {
      this.dialog = !this.dialog;
    },
    cancel() {
      this.edited = false;
    },
    async editingQuestion() {
      this.defaultQuestion = Object.assign({}, this.question);

      await this.$store.dispatch("tag/getAllTags");
      await this.$store.dispatch(
        "tag/getTagsInQuestion",
        this.question.questionId
      );
      await this.$store.dispatch(
        "answer/getAnswersInQuestion",
        this.question.questionId
      );
      await this.$store.dispatch(
        "choice/getChoicesInQuestion",
        this.question.questionId
      );
      await this.$store.dispatch(
        "image/getImageInQuestion",
        this.question.questionId
      );

      this.defaultTagsOfQuestion = this.tagsOfQuestion;
      this.defaultAnswers = this.answers;
      this.defaultChoices = this.choices;

      this.edited = true;
      console.log(this.defaultImage);
      console.log(this.image.name);
    },
  },
  computed: {
    ...mapState("tag", ["tags"]),
    ...mapState("tag", ["tagsOfQuestion"]),
    ...mapState("answer", ["answers"]),
    ...mapState("choice", ["choices"]),
    ...mapState("image", ["image"]),
    buttonText() {
      return this.selectedFile
        ? this.selectedFile.name
        : this.defaultButtonText;
    },
    isEditingQuestion() {
      return !this.edited ? true : false;
    },
    hasImage() {
      return this.selectedFile || this.image.path ? true : false;
    },
    showImage() {
      return this.image.path
        ? `http://localhost:8000/static/${this.image.path}`
        : this.selectedFile;
    },
  },
};
</script>
