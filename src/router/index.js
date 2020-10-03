import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Welcome from "../views/Welcome.vue";
import Class from "../views/Class.vue";
import StudyGroup from "../views/StudyGroup.vue";
import ListStudent from "../views/ListStudent.vue";
import Exam from "../views/Exam.vue";
import Question from "../views/Question.vue";
import EditExam from "../views/EditExam.vue";
import Score from "../views/Score.vue";
import Appointment from "../views/Appointment.vue";
import Examination from "../views/Examination";
import SelectMeeting from "../views/SelectMeeting";
import CreateExamination from "../views/CreateExamination";
import ShowAppointment from "../views/ShowAppointment";
import store from "@/store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true },
    children: [
      { path: "/", component: Welcome },
      { path: "welcome", name: "Welcome", component: Welcome },
      { path: "class", name: "Class", component: Class },
      { path: "study-group", name: "StudyGroup", component: StudyGroup },
      { path: "list-student", name: "ListStudent", component: ListStudent },
      { path: "exam", name: "Exam", component: Exam },
      {
        path: "question/:subjectId/:examId",
        name: "Question",
        component: Question,
        props: true,
        async beforeEnter(routeTo, routeFrom, next) {
          const questions = await store.dispatch(
            "question/getQuestionsInExam",
            routeTo.params.examId
          );

          routeTo.params.questions = questions;
          next();
        },
      },
      {
        path: "edit-exam/:subjectId/:examId",
        name: "EditExam",
        component: EditExam,
        props: true,
        async beforeEnter(routeTo, routeFrom, next) {
          const exam = await store.dispatch("exam/getExam", {
            subjectId: routeTo.params.subjectId,
            examId: routeTo.params.examId,
          });
          routeTo.params.exam = exam;

          const questions = await store.dispatch(
            "question/getQuestionsInExam",
            routeTo.params.examId
          );
          routeTo.params.questions = questions;
          next();
        },
      },
      { path: "score", name: "Score", component: Score },
      { path: "appointment", name: "Appointment", component: Appointment },
      { path: "examination", name: "Examination", component: Examination },
      {
        path: "select-meeting",
        name: "SelectMeeting",
        component: SelectMeeting,
      },
      {
        path: "create-examination/:meetingId",
        name: "CreateExamination",
        component: CreateExamination,
        props: true,
      },
      {
        path: "appointment/:meetingId",
        name: "ShowAppointment",
        component: ShowAppointment,
        props: true,
        async beforeEnter(routeTo, routeFrom, next) {
          const meeting = await store.dispatch(
            "meeting/getMeeting",
            routeTo.params.meetingId
          );
          routeTo.params.meeting = meeting;
          const students = await store.dispatch(
            "meeting/getAllStudentInMeeting",
            routeTo.params.meetingId
          );
          routeTo.params.students = students;
          next();
        },
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// router.beforeEach((to, from, next) => {
//   const loggedIn = localStorage.getItem("teacher-token");

//   if (to.matched.some((record) => record.meta.requiresAuth) && !loggedIn) {
//     next("/");
//   }
//   next();
// });

export default router;
