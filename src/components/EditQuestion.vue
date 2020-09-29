<template>
  <div>
    <v-card class="mx-auto pa-5" style="border-radius: 20px;" outlined>
      <h4 class="color-dark-blue">แก้ไขคำถาม</h4>
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
      <div v-if="image">
        <v-img
          :src="
            image.name ? `http://localhost:8000/static/${image.name}` : image
          "
        ></v-img>
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
    </v-card>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "editQuestion",
  props: {
    editQuestion: Boolean,
    questionId: Number,
  },
  data: () => ({
    types: ["ปรนัย", "อัตนัย"],
    levelItems: [1, 2, 3, 4, 5],
    tagOfQuestion: [],
    question: {
      question: "",
      questionType: "",
      level: null,
    },
    choices: [],
    // newChoices: [],
    deletedChoices: [],
    deletedTagsInQuestion: [],
    deletedAnswer: [],
    selectedFile: null,
    isSelecting: false,
    defaultButtonText: "UPLOAD IMAGE",
    score: null,
    answers: [],
    image: "",
  }),
  methods: {
    async updateQuestion() {
      const updatedQuestion = await this.$store.dispatch(
        "question/editQuestion",
        {
          questionId: this.questionId,
          questionType: this.types,
          question: this.question,
          level: this.level,
        }
      );

      this.editChoices();
      this.editAnswers();
      this.editTags();

      if (this.selectedFile.name != this.image.name) this.changeImage();
      else {
        if (updatedQuestion.status == "success")
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
      this.choices.push({
        choice: `ตัวเลือกที่ ${this.choices.length + 1}`,
        order: this.choices.length + 1,
      });
    },
    subChoice(index) {
      this.deletedChoices.push(this.choices.splice(index, 1));
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
      this.$emit("cancel", !this.editQuestion);
    },
  },
  computed: {
    ...mapState("tag", ["tags"]),
    ...mapState("tag", ["tagsInQuestion"]),
    ...mapState("answer", ["answersInQuestion"]),
    ...mapState("choice", ["choicesInQuestion"]),
    ...mapState("image", ["imageInQuestion"]),
    buttonText() {
      return this.selectedFile
        ? this.selectedFile.name
        : this.defaultButtonText;
    },
    isEditingExam() {
      return this.editing ? true : false;
    },
  },
  created() {
    this.$store.dispatch("tag/getAllTags");
    this.question = this.$store.dispatch(
      "question/questionsInExam",
      this.$route.params.examId
    );
    this.tagOfQuestion = this.$store.dispatch(
      "tag/getTagsInQuestion",
      this.$route.params.questionId
    );
    this.answers = this.$store.dispatch(
      "answer/getAnswersInQuestion",
      this.$route.params.questionId
    );
    this.choices = this.$store.dispatch(
      "choice/getChoicesInQuestion",
      this.$route.params.questionId
    );
    this.image = this.$store.dispatch(
      "image/getImageInQuestion",
      this.$route.params.questionId
    );
  },
};
</script>
