import Vue from "vue";
import VueApexCharts from "vue-apexcharts";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import {dataService} from "@/services/DataService";
import {matchMakingService} from "@/services/MatchmakingService";

Vue.config.productionTip = false;
Vue.component("apexchart", VueApexCharts);

new Vue({
  router,
  store,
  provide: {
    dataService,
    matchMakingService
  },
  render: (h) => h(App),
}).$mount("#app");
