import { Component, createApp } from "vue"
import Spinner from "@/components/spinner/index.vue"
import Toast from "./index.vue"

let instance: HTMLElement | null = null
let timer: ReturnType<typeof setTimeout> | null = null

type ToastOptions = {
  text?: string
  icon?: Component
  duration?: number
}

const defaultOptions: ToastOptions = {
  duration: 2000
}

const hideToast = () => {
  if (instance) {
    instance.remove()
    instance = null
  }

  if (timer) {
    clearTimeout(timer)
    timer = null
  }
}

const showToast = (options: ToastOptions) => {
  const { duration, ...rest } = { ...defaultOptions, ...options }

  const container = document.createElement("div")
  createApp(Toast, rest).mount(container)
  document.body.appendChild(container)
  instance = container

  if (duration) {
    timer = setTimeout(hideToast, duration)
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
export type { ToastOptions }
