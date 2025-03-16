import { createWebHistory, createRouter, RouteRecordRaw } from "vue-router"

import lessons from "./pages/lessons/index.vue"
import lesson from "./pages/lesson/index.vue"
import emoji from "./pages/emoji/index.vue"
import demos from "./demos/index.vue"

const demoPages = import.meta.glob("./demos/*/index.vue")
const demoRoutes = Object.entries(demoPages).map(([path, component]) => {
  const name = path.match(/\.\/demos\/(.*)\/index\.vue$/)?.[1]
  return {
    path: name,
    component,
  }
})

const allPages = import.meta.glob("./pages/*/index.vue")

const routes = [
  { path: "/", component: lessons },
  { path: "/lesson/:lessonNo", component: lesson },
  { path: "/emoji", component: emoji },
  {
    path: "/demos",
    component: demos,
    children: demoRoutes
  },
  ...Object.entries(allPages).map(([path, component]) => {
    const name = path.match(/\.\/pages\/(.*)\/index\.vue$/)?.[1]
    return {
      path: "/" + name,
      component,
    }
  })
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes as RouteRecordRaw[],
  scrollBehavior: (_, __, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

export default router
