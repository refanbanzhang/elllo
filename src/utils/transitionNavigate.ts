import { useRouter } from "vue-router"

const useTransitionNavigate = () => {
  const router = useRouter()

  const transitionNavigate = (lessonNo: string) => {
    if ("startViewTransition" in document) {
      document.startViewTransition(() => {
        router.push(`/elllo/${lessonNo}`)
      })
    } else {
      router.push(`/elllo/${lessonNo}`)
    }
  }

  return {
    transitionNavigate
  }
}

export default useTransitionNavigate
