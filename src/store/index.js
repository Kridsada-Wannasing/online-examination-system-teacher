import Vue from "vue";
import Vuex from "vuex";
import * as teacher from "../store/modules/teacher";
import * as subject from "../store/modules/subject";
import * as exam from "../store/modules/exam";
import * as question from "../store/modules/question";
import * as tag from "../store/modules/tag";
import * as choice from "../store/modules/choice";
import * as answer from "../store/modules/answer";
import * as image from "../store/modules/image";
import * as meeting from "../store/modules/meeting";
import * as examination from "../store/modules/examination";
import * as student from "../store/modules/student";
import * as score from "../store/modules/score";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    teacher,
    subject,
    exam,
    question,
    tag,
    choice,
    answer,
    image,
    meeting,
    examination,
    student,
    score
  },
  state: {},
  mutations: {},
  actions: {}
});
