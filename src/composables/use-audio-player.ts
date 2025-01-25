import { ref, watch } from "vue"
import { getAudios } from "@/api/audio"
import type { AudioItem } from "@/types"

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
  const playbackRate = ref<number>(1)
  const duration = ref<number>(0)

  const getNextLessonNo = (currentLessonNo: string): string => {
    const currentIndex = audios.value.findIndex((item) => item.lessonNo === currentLessonNo)
    const nextIndex = currentIndex + 1
    return nextIndex < audios.value.length
      ? audios.value[nextIndex].lessonNo
      : audios.value[0].lessonNo
  }

  const setCurrentLessonNo = (lessonNo: string) => {
    currentLessonNo.value = lessonNo
  }

  const setPlaybackRate = (rate: number) => {
    playbackRate.value = rate
  }

  const setActiveSrc = (lessonNo: string) => {
    // 设置当前播放的音频
    const matchAudio = audios.value.find((item) => item.lessonNo === lessonNo)
    if (matchAudio) {
      audio.value.src = matchAudio.url
    }
  }

  const pause = () => {
    audio.value.pause()
  }

  const resume = () => {
    audio.value.play()
  }

  const play = (lessonNo: string) => {
    pause()
    currentLessonNo.value = lessonNo
    setActiveSrc(lessonNo)
    audio.value.playbackRate = playbackRate.value
    audio.value.play()
    localStorage.setItem("lastPlayedLessonNo", lessonNo)
  }

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

  watch(() => playbackRate.value, (newRate) => {
    audio.value.playbackRate = newRate
    localStorage.setItem("playbackRate", newRate.toString())
  })

  const loadNextPage = async () => {
    if (!hasMore.value) {
      alert("没有更多数据了")
      return
    }

    if (isLoading.value) {
      return
    }

    isLoading.value = true
    const nextPage = currentPage.value + 1

    const res = await getAudios({ page: nextPage, pageSize: pageSize.value })
    audios.value = [...audios.value, ...res.items]
    hasMore.value = (nextPage * pageSize.value) < res.total
    currentPage.value = nextPage
    isLoading.value = false
  }

  const init = async () => {
    // 初始化获取数据
    await loadNextPage()

    // 设置当前播放的音频
    setActiveSrc(currentLessonNo.value || "")
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
    setCurrentLessonNo,
    setPlaybackRate,
    loadNextPage,
  }
}

export default createAudioPlayer()