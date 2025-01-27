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

  // 1 没有传入，播放
  // 2 传入了，并且和播放器上的是同一个，播放
  // 3 传入了，并且和播放器上的不是同一个，更新播放器，播放
  const play = (lesson?: Lesson) => {
    pause()

    // 如果没有传入 lesson 且没有正在播放的课程，直接返回
    if (!lesson && !playingLesson.value) {
      return
    }

    // 没有传入，播放当前
    if (!lesson && playingLesson.value) {
      audio.value.play()
      return
    }

    // 传入 lesson 且和当前播放的 lesson 相同，播放
    if (lesson && playingLesson.value?.lessonNo === lesson.lessonNo) {
      audio.value.play()
      return
    }

    // 传入 lesson 且和当前播放的 lesson 不同，更新播放器，播放
    if (lesson && playingLesson.value?.lessonNo !== lesson.lessonNo) {
      playingLesson.value = lesson
      audio.value.src = lesson.url
      audio.value.play()
      return
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