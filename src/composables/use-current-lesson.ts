import { ref } from "vue"
import type { Lesson } from "@/types"

const useCurrentLesson = () => {
  const lesson = ref<Lesson | null>(null)

  const setLesson = (data: Lesson) => {
    lesson.value = data
  }

  return {
    lesson,
    setLesson
  }
}

export default useCurrentLesson()
