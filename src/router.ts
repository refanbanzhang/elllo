import { createWebHistory, createRouter } from "vue-router"

import components from "./pages/components/index.vue"
import lesson from "./pages/lesson/index.vue"
import lessons from "./pages/lessons/index.vue"
import emoji from "./pages/emoji/index.vue"

const routes = [
  { path: "/", component: lessons },
  { path: "/lesson/:lessonNo", component: lesson },
  { path: "/components", component: components },
  { path: "/emoji", component: emoji },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_, __, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

export default router
