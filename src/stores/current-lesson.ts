import { ref } from "vue"
import type { Lesson } from "@/types"

const lesson = ref<Lesson | null>(null)

const setLesson = (value: Lesson) => {
  lesson.value = value
}

export default {
  lesson,
  setLesson
}
