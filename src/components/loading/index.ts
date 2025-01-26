import { createApp } from "vue"
import Overlay from "./index.vue"

const overlayInstances: HTMLElement[] = []

const showLoading = (options: { text?: string } = {}) => {
  const container = document.createElement("div")
  container.classList.add("loading")
  const loadingApp = createApp(Overlay, options)
  loadingApp.mount(container)
  document.body.appendChild(container)
  overlayInstances.push(container)
}

const hideLoading = () => {
  const lastLoading = overlayInstances.pop()
  if (lastLoading) {
    lastLoading.remove()
  }
}

const showToast = (text: string, options: { duration: number } = { duration: 2000 }) => {
  const container = document.createElement("div")
  container.classList.add("toast")
  const toastApp = createApp(Overlay, { text })
  toastApp.mount(container)
  document.body.appendChild(container)
  overlayInstances.push(container)

  setTimeout(() => {
    const lastToast = overlayInstances.pop()
    if (lastToast) {
      lastToast.remove()
    }
  }, options.duration)
}

export { showLoading, hideLoading, showToast }
