import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import DatetimePicker from "vuetify-datetime-picker";
// import VueTimepicker from "vue2-timepicker";

// CSS
import "vue2-timepicker/dist/VueTimepicker.css";

Vue.use(DatetimePicker);
// import VueSocketIO from "vue-socket.io";

Vue.config.productionTip = false;

// Vue.use(
//   new VueSocketIO({
//     debug: true,
//     connection: "http://localhost:8000",
//     vuex: {
//       store,
//       actionPrefix: "SOCKET_",
//       mutationPrefix: "SOCKET_",
//     },
//     options: { path: "/my-app/" }, //Optional options
//   })
// );

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
