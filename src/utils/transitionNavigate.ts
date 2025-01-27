import { useRouter } from "vue-router"

const useTransitionNavigate = () => {
  const router = useRouter()

  const transitionNavigate = (lessonNo: string) => {
    if ("startViewTransition" in document) {
      document.startViewTransition(() => {
        router.push(`/lesson/${lessonNo}`)
      })
    } else {
      router.push(`/lesson/${lessonNo}`)
    }
  }

  return {
    transitionNavigate
  }
}

export default useTransitionNavigate
