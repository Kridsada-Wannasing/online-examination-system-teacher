import Vue from "vue";
import Vuex from "vuex";
import * as teacher from "../store/modules/teacher";
import * as subject from "../store/modules/subject";
import * as exam from "../store/modules/exam";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { teacher, subject, exam },
  state: {},
  mutations: {},
  actions: {},
});
