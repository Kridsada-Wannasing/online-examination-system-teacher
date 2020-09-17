<template>
  <div class="mr-10">
    <div v-if="color == 'green'" class="h-100">
      <v-img src="@/assets/icon/folder-green.svg">
        <v-row class="white--text px-3 py-4 h-100">
          <v-col class="text-left">
            <div style="height: 70%">
              <p class="mb-0" style="font-size: 14px;">
                <b>{{ exam.subjectId }}</b>
              </p>
              <p style="font-size: 12px">{{ exam.examName }}</p>
            </div>
            <div style="height: 30%">
              <p class="mb-0" style="font-size: 12px">{{ exam.semester }}</p>
              <p class="mb-0" style="font-size: 12px">{{ exam.examType }}</p>
              <!-- <p class="mb-0" style="font-size: 12px">{{ code }}</p> -->
            </div>
          </v-col>
        </v-row>
      </v-img>
    </div>
    <div v-if="color == 'blue'">
      <v-img src="@/assets/icon/folder-blue.svg">
        <v-row class="white--text px-3 py-4 h-100">
          <v-col class="text-left">
            <div style="height: 70%">
              <p class="mb-0" style="font-size: 14px;">
                <b>{{ exam.subjectId }}</b>
              </p>
              <p style="font-size: 12px">{{ exam.examName }}</p>
            </div>
            <div style="height: 30%">
              <p class="mb-0" style="font-size: 12px">{{ exam.semester }}</p>
              <p class="mb-0" style="font-size: 12px">{{ exam.examType }}</p>
              <!-- <p class="mb-0" style="font-size: 12px">{{ code }}</p> -->
            </div>
          </v-col>
        </v-row>
      </v-img>
    </div>
    <div v-if="color == 'plus'">
      <v-img src="@/assets/icon/folder.svg"></v-img>
    </div>
  </div>
</template>
<script>
export default {
  name: "folder",
  props: {
    exam: Object,
    color: String,
  },
  data() {
    return {
      imagePath: `@/assets/icon/folder-${this.color}.svg`,
    };
  },
  methods: {
    getImgUrl() {
      return require(this.imagePath);
    },
  },
};
</script>
