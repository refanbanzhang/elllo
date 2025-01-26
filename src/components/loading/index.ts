import { createApp } from "vue"
import Loading from "./index.vue"

const loadingInstances: HTMLElement[] = []

const showLoading = () => {
  const container = document.createElement("div")
  container.classList.add("loading")
  const loadingApp = createApp(Loading)
  loadingApp.mount(container)
  document.body.appendChild(container)
  loadingInstances.push(container)
}

const hideLoading = () => {
  const lastLoading = loadingInstances.pop()
  if (lastLoading) {
    lastLoading.remove()
  }
}

export { showLoading, hideLoading }
