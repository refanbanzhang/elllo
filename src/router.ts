import { createWebHashHistory, createRouter } from "vue-router"

import elllo from "./pages/elllo/index.vue"
import youtube from "./pages/youtube/index.vue"
import test from "./pages/test/index.vue"

const routes = [
  { path: "/", component: elllo },
  { path: "/youtube", component: youtube },
  { path: "/test", component: test },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
