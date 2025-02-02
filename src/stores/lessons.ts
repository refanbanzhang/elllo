import { ref } from "vue"
import type { Lesson } from "@/types"
import { getLessons } from "@/api/audio"
import { showLoading, showToast, hideLoading } from "@/components/toast"

const currentPage = ref<number>(0)
const pageSize = ref<number>(20)
const isLoading = ref<boolean>(false)
const hasMore = ref<boolean>(true)
const lessons = ref<Lesson[]>([])

const loadNextPage = async () => {
  if (!hasMore.value) {
    showToast({
      text: "没有更多数据了"
    })
    return
  }

  if (isLoading.value) {
    return
  }

  showLoading()

  isLoading.value = true
  const nextPage = currentPage.value + 1

  const res = await getLessons({ page: nextPage, pageSize: pageSize.value })
  lessons.value = [...lessons.value, ...res.items]
  hasMore.value = (nextPage * pageSize.value) < res.total
  currentPage.value = nextPage
  isLoading.value = false

  hideLoading()
}

loadNextPage()

export default {
  lessons,
  loadNextPage
}
