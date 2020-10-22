import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import DatetimePicker from "vuetify-datetime-picker";
import "nprogress/nprogress.css";
import TextHighlight from "vue-text-highlight";

Vue.component("text-highlight", TextHighlight);

// CSS
import "vue2-timepicker/dist/VueTimepicker.css";

Vue.use(DatetimePicker);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
