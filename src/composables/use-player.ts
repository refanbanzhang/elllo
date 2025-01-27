import { ref, computed } from "vue"
import { Lesson } from "@/types"

const usePlayer = () => {
  const audio = ref<HTMLAudioElement>(new Audio())
  const currentTime = ref<number>(audio.value.currentTime)
  const isPlaying = ref<boolean>(false)
  const duration = ref<number>(0)
  const playingLesson = ref<Lesson | null>(null)

  const pause = () => {
    audio.value.pause()
  }

  const play = (lesson?: Lesson) => {
    pause()

    // 播放当前
    if (!lesson && playingLesson.value) {
      audio.value.play()
      return
    }

    // 播放目标和当前是同一个lesson，则直接播放
    if (lesson && playingLesson.value?.lessonNo === lesson.lessonNo) {
      audio.value.play()
      return
    }

    // 播放目标
    if (lesson) {
      playingLesson.value = lesson
      audio.value.src = lesson.url
      audio.value.play()
    }
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
      // playNextAudio()
    })

    audio.value.addEventListener("error", () => {
      // playNextAudio()
    })
  }

  const isPaused = computed(() => {
    return !isPlaying.value
  })

  initEvents()

  return {
    playingLesson,
    currentTime,
    duration,
    isPlaying,
    isPaused,
    play,
    pause,
  }
}

export default usePlayer()