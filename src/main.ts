import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import {dataService} from "@/services/DataService";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  provide: {
    dataService
  },
  render: (h) => h(App),
}).$mount("#app");
