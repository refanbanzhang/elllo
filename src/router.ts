import { createWebHistory, createRouter } from "vue-router"

import lessons from "./pages/lessons/index.vue"
import lesson from "./pages/lesson/index.vue"
import components from "./pages/components/index.vue"

const routes = [
  { path: "/", component: lessons },
  { path: "/lesson/:lessonNo", component: lesson },
  { path: "/components", component: components },
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
