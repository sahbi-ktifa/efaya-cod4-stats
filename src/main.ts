import { createApp } from "vue";
import VueApexCharts from "vue3-apexcharts";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { dataService } from "@/services/DataService";
import { matchMakingService } from "@/services/MatchmakingService";

const app = createApp(App);
app.component("apexchart", VueApexCharts);
app.provide("dataService", dataService);
app.provide("matchMakingService", matchMakingService);
app.use(router);
app.use(store);
app.mount("#app");
