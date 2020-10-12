import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Welcome from "../views/Welcome.vue";
import Class from "../views/Class.vue";
import ListStudent from "../views/ListStudent.vue";
import Exam from "../views/Exam.vue";
import Question from "../views/Question.vue";
import EditExam from "../views/EditExam.vue";
import Score from "../views/Score.vue";
import Appointment from "../views/Appointment.vue";
import ShowAppointment from "../views/ShowAppointment";
import NProgress from "nprogress";
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
      {
        path: "welcome",
        name: "Welcome",
        component: Welcome,
        beforeEnter(routeTo, routeFrom, next) {
          store
            .dispatch("subject/getAllSubjects")
            .then((subjects) => {
              routeTo.params.subjects = subjects;
              next();
            })
            .catch((err) => {
              console.log(err.response.message);
            });
        },
      },
      { path: "class", name: "Class", component: Class },
      // { path: "study-group", name: "StudyGroup", component: StudyGroup },
      {
        path: "list-student",
        name: "ListStudent",
        component: ListStudent,
        beforeEnter(routeTo, routeFrom, next) {
          store
            .dispatch("student/getAllStudents")
            .then((students) => {
              routeTo.params.students = students;
              next();
            })
            .catch((err) => {
              console.log(err);
            });
        },
      },
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
      // { path: "examination", name: "Examination", component: Examination },
      // {
      //   path: "select-meeting",
      //   name: "SelectMeeting",
      //   component: SelectMeeting,
      // },
      // {
      //   path: "setting-examination/:meetingId",
      //   name: "SettingExamination",
      //   component: SettingExamination,
      //   props: true,
      //   async beforeEnter(routeTo, routeFrom, next) {
      //     const examination = await store.dispatch(
      //       "examination/getExamination",
      //       routeTo.params.meetingId
      //     );
      //     routeTo.params.examination = examination;

      //     next();
      //   },
      // },
      {
        path: "appointment/:meetingId",
        name: "ShowAppointment",
        component: ShowAppointment,
        props: true,
        async beforeEnter(routeTo, routeFrom, next) {
          try {
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
          } catch (error) {
            console.log(error);
          }
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

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem("token_teacher");

  if (to.matched.some((record) => record.meta.requiresAuth) && !loggedIn) {
    next("/");
  }

  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
