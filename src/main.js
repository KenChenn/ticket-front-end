import { createApp } from "vue";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { VueCookies } from "vue-cookies";
import 'bootstrap';

import App from "./App.vue";
import router from "./router";

import "./assets/main.scss";

const app = createApp(App);
const pinia = createPinia();

app.use(ElementPlus);
app.use(router);
app.use(pinia);

app.mount("#app");

app.config.globalProperties.$cookies = VueCookies;
$cookies.config(60*60*24*30);
