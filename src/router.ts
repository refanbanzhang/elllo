import { createWebHistory, createRouter } from "vue-router"

import lessons from "./pages/lessons/index.vue"
import lesson from "./pages/lesson/index.vue"
import test from "./pages/test/index.vue"
import photos from "./pages/photos/index.vue"
import photo from "./pages/photo/index.vue"
import liveTransitions from "./pages/live-transitions/index.vue"
import liveTransition from "./pages/live-transition/index.vue"
import MergeList from "./pages/merge-list/index.vue"

const routes = [
  { path: "/", component: lessons },
  { path: "/elllo/:lessonNo", component: lesson },
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
  {
    path: "/merge-list",
    component: MergeList,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

export default router
