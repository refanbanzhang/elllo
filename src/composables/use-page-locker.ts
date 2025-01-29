import { ref } from "vue"

const usePageLocker = () => {
  const cachedOverflow = ref("")

  const lockPage = () => {
    cachedOverflow.value = document.body.style.overflow
    document.body.style.overflow = "hidden"
  }

  const unlockPage = () => {
    document.body.style.overflow = cachedOverflow.value
  }

  return {
    lockPage,
    unlockPage,
  }
}

export default usePageLocker
