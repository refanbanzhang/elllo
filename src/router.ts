import { createWebHistory, createRouter } from "vue-router"

import lessons from "./pages/lessons/index.vue"
import lesson from "./pages/lesson/index.vue"
import emoji from "./pages/emoji/index.vue"

const demoPages = import.meta.glob('./demos/*/index.vue')
const demoRoutes = Object.entries(demoPages).map(([path, component]) => {
  const name = path.match(/\.\/demos\/(.*)\/index\.vue$/)?.[1]
  return {
    path: `/demos/${name}`,
    component,
  }
})

const routes = [
  { path: "/", component: lessons },
  { path: "/lesson/:lessonNo", component: lesson },
  { path: "/emoji", component: emoji },
  ...demoRoutes
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
