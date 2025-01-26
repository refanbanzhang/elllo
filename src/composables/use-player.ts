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

  const resume = () => {
    audio.value.play()
  }

  const play = (lesson: Lesson) => {
    playingLesson.value = lesson
    audio.value.src = lesson.url
    audio.value.play()
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
    return !isPlaying.value && currentTime.value > 0
  })

  const isInitial = computed(() => {
    return !isPlaying.value && currentTime.value === 0
  })

  initEvents()

  return {
    playingLesson,
    currentTime,
    duration,
    isInitial,
    isPlaying,
    isPaused,
    play,
    pause,
    resume,
  }
}

export default usePlayer()