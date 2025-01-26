import { ref } from "vue"
import type { AudioItem } from "@/types"
import { getAudios } from "@/api/audio"
import { showLoading, hideLoading, showToast } from "@/components/loading"

const useAudios = () => {
  const currentPage = ref<number>(0)
  const pageSize = ref<number>(20)
  const isLoading = ref<boolean>(false)
  const hasMore = ref<boolean>(true)
  const audios = ref<AudioItem[]>([])

  const loadNextPage = async () => {
    if (!hasMore.value) {
      showToast("没有更多数据了")
      return
    }

    if (isLoading.value) {
      return
    }

    showLoading()

    isLoading.value = true
    const nextPage = currentPage.value + 1

    const res = await getAudios({ page: nextPage, pageSize: pageSize.value })
    audios.value = [...audios.value, ...res.items]
    hasMore.value = (nextPage * pageSize.value) < res.total
    currentPage.value = nextPage
    isLoading.value = false

    hideLoading()
  }

  return {
    audios,
    loadNextPage
  }
}

export default useAudios
