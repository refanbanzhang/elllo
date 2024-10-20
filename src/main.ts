import { createApp } from "vue"
import "tdesign-mobile-vue/es/style/index.css"

import "./style.css"
import App from "./App.vue"
import router from "./router"

createApp(App).use(router).mount("#app")
