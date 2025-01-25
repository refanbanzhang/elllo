import { createApp } from "vue"
import Loading from "./index.vue"

const showLoading = () => {
  const app = document.querySelector("#app")
  const container = document.createElement("div")
  container.classList.add("loading")
  const loadingApp = createApp(Loading)
  loadingApp.mount(container)
  app?.appendChild(container)
}

const hideLoading = () => {
  const app = document.querySelector("#app")
  const loading = app?.querySelector(".loading")
  if (loading) {
    loading.remove()
  }
}

export { showLoading, hideLoading }
