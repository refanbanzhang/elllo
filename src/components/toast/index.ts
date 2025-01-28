import { Component, createApp } from "vue"
import Spinner from "@/components/spinner/index.vue"
import Toast from "./index.vue"

const toastInstances: HTMLElement[] = []

type ToastOptions = {
  text?: string
  icon?: Component
  duration?: number
}

const defaultOptions: ToastOptions = {
  duration: 2000
}

const hideToast = () => {
  const lastToast = toastInstances.pop()
  if (lastToast) {
    lastToast.remove()
  }
}

const showToast = (options: ToastOptions) => {
  const { duration, ...rest } = { ...defaultOptions, ...options }

  const container = document.createElement("div")
  createApp(Toast, rest).mount(container)
  document.body.appendChild(container)
  toastInstances.push(container)

  if (duration) {
    setTimeout(hideToast, duration)
  }
}

const showLoading = () => {
  showToast({
    icon: Spinner,
    duration: 0,
  })
}

const hideLoading = () => {
  hideToast()
}

export { showToast, hideToast, showLoading, hideLoading }
