import { createApp } from "vue";
import { createPinia } from "pinia";
import ApexCharts from 'apexcharts';
import VueApexCharts from 'vue3-apexcharts';
import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const app = createApp(App);

app.use(createPinia());
app.use(VueApexCharts);

// app.component('apexchart', VueApexCharts);

app.use(router);

app.mount("#app");
