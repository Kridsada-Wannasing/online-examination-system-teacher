<style lang="scss"></style>
<template id="score">
  <div class="h-100">
    <v-row no-gutters class="h-100" align="center">
      <v-col lg="9" md="8" sm="12" xs="12" class="h-100">
        <h1 class="color-white">คะแนนสอบ</h1>
        <FilterClass
          :subjects="subjects"
          :exams="exams"
          @selectedSubject="getSelectedSubject"
        />
        <div class="pt-10">
          <ScoreTable :scores="scores" />
        </div>
      </v-col>
      <v-col lg="3" md="4" sm="12" xs="12" class="h-100 pl-5">
        <ProfileMenu />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import ProfileMenu from "@/components/ProfileMenu";
import ScoreTable from "@/components/ScoreTable";
import FilterClass from "@/components/FilterClass";
import { mapState } from "vuex";

export default {
  name: "score",
  components: {
    ProfileMenu,
    FilterClass,
    ScoreTable,
  },
  data() {
    return {
      subject: null,
      query: {},
    };
  },
  computed: {
    ...mapState("score", ["scores"]),
  },
  methods: {
    getSelectedSubject(event) {
      this.query.subject = event;
    },
  },
  created() {
    this.$store.dispatch("subject/getAllSubjects");
    this.$store.dispatch("exam/getAllExams");
  },
};
</script>
