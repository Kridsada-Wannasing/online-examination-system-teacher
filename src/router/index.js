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
      { path: "welcome", component: Welcome },
      { path: "class", component: Class },
      { path: "studygroup", component: StudyGroup },
      { path: "liststudent", component: ListStudent },
      { path: "exam", component: Exam },
      { path: "question", component: Question },
      { path: "editexam", component: EditExam },
      { path: "score", component: Score },
      { path: "appointment", component: Appointment },
    ],
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// router.beforeEach((to, from, next) => {
//   const loggedIn = localStorage.getItem("teacher");

//   if (to.matched.some((record) => record.meta.requiresAuth) && !loggedIn) {
//     next("/");
//   }
//   next();
// });

export default router;
