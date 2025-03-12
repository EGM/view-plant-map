import "./style.css";
import { createApp } from "vue";
import "vue3-openlayers/styles.css";
import OpenLayersMap from "vue3-openlayers";
import App from "./App.vue";

const app = createApp(App);
app.use(OpenLayersMap /*, options */);
app.mount("#app");
