// Imports
import { createApp } from "vue";
import App from "./App.vue";
import router from "./assets/router/index";

// Launch App
const app = createApp(App);
app.use(router).mount("#app");

// Global Configs
app.config.globalProperties.$password_encode = false;
