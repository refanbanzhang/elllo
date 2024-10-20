import { createWebHashHistory, createRouter } from "vue-router"

import elllo from "./pages/elllo/index.vue"
import youtube from "./pages/youtube/index.vue"

const routes = [
  { path: "/", component: elllo },
  { path: "/youtube", component: youtube },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
