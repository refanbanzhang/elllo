import { ref } from "vue"
import { getAudios } from "@/api/audio"
import type { AudioItem } from "@/types"
import { showLoading, hideLoading } from "@/components/loading"

const createAudioPlayer = () => {
  const currentPage = ref<number>(0)
  const pageSize = ref<number>(20)
  const isLoading = ref<boolean>(false)
  const hasMore = ref<boolean>(true)
  const audio = ref<HTMLAudioElement>(new Audio())
  const currentLessonNo = ref<string>()
  const audios = ref<AudioItem[]>([])
  const currentTime = ref<number>(audio.value.currentTime)
  const isPlaying = ref<boolean>(false)
  const duration = ref<number>(0)

  const getNextLessonNo = (lessonNo: string): string => {
    const currentIndex = audios.value.findIndex((item) => item.lessonNo === lessonNo)
    const nextIndex = currentIndex + 1
    return nextIndex < audios.value.length
      ? audios.value[nextIndex].lessonNo
      : audios.value[0].lessonNo
  }

  // 设置音频播放内容
  // 设置当前音频编号
  // 缓存当前播放的音频编号
  const setAudioSrc = (lessonNo: string) => {
    const matchAudio = audios.value.find((item) => item.lessonNo === lessonNo)
    if (matchAudio) {
      audio.value.src = matchAudio.url
      currentLessonNo.value = lessonNo
      localStorage.setItem("lastPlayedLessonNo", lessonNo)
      return
    }

    if (audios.value.length > 0) {
      audio.value.src = audios.value[0].url
      return
    }

    throw new Error("没有找到音频")
  }

  const pause = () => {
    audio.value.pause()
  }

  const resume = () => {
    audio.value.play()
  }

  const play = (lessonNo: string) => {
    try {
      pause()
      setAudioSrc(lessonNo)
      audio.value.play()
    } catch (error) {
      console.error(error)
    }
  }

  const loadNextPage = async () => {
    if (!hasMore.value) {
      alert("没有更多数据了")
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

  const initEvents = () => {
    audio.value.addEventListener("play", () => {
      isPlaying.value = true
    })

    audio.value.addEventListener("pause", () => {
      isPlaying.value = false
    })

    audio.value.addEventListener("timeupdate", () => {
      currentTime.value = audio.value.currentTime
    })

    audio.value.addEventListener("durationchange", () => {
      duration.value = audio.value.duration
    })

    audio.value.addEventListener("ended", () => {
      console.log("音频播放结束")
      play(getNextLessonNo(currentLessonNo.value || ""))
    })

    audio.value.addEventListener("error", () => {
      console.log("音频播放错误")
      play(getNextLessonNo(currentLessonNo.value || ""))
    })
  }

  const init = async () => {
    initEvents()

    // 初始化获取数据
    await loadNextPage()

    const lastPlayedLessonNo = localStorage.getItem("lastPlayedLessonNo")
    if (lastPlayedLessonNo) {
      setAudioSrc(lastPlayedLessonNo)
    }
  }

  init()

  return {
    audios,
    currentLessonNo,
    currentTime,
    duration,
    isPlaying,
    pause,
    resume,
    play,
    loadNextPage,
  }
}

export default createAudioPlayer()