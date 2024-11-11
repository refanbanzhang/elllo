import { createWebHistory, createRouter } from "vue-router"

import lessons from "./pages/lessons/index.vue"
import lesson from "./pages/lesson/index.vue"
import test from "./pages/test/index.vue"
import photos from "./pages/photos/index.vue"
import photo from "./pages/photo/index.vue"
import liveTransitions from "./pages/live-transitions/index.vue"
import liveTransition from "./pages/live-transition/index.vue"

const routes = [
  { path: "/", component: lessons },
  { path: "/elllo/:id", component: lesson },
  { path: "/test", component: test },
  {
    path: "/photos",
    component: photos,
  },
  {
    path: "/photos/:id",
    component: photo,
  },
  {
    path: "/live-transitions",
    component: liveTransitions,
  },
  {
    path: "/live-transitions/:id",
    component: liveTransition,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
