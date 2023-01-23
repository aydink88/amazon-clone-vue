import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { LoadingBox, MessageBox } from "./components";
import "./assets/style.css";

const app = createApp(App).component("LoadingBox", LoadingBox).component("MessageBox", MessageBox);

app.use(createPinia());
app.use(router);

app.mount("#app");
