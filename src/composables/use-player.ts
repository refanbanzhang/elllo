import { ref, watch } from "vue"
import type { Lesson } from "@/types"
import { getNextLesson, getPrevLesson } from "@/api/audio"

const usePlayer = () => {
  const audio = ref<HTMLAudioElement>(new Audio())
  const currentTime = ref<number>(audio.value.currentTime)
  const isPlaying = ref<boolean>(false)
  const duration = ref<number>(0)
  const playingLesson = ref<Lesson | null>(null)
  const volume = ref<number>(100)
  const speed = ref<number>(1)

  const setVolume = (value: number) => {
    volume.value = value
  }

  const setSpeed = (value: number) => {
    speed.value = value
  }

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

      // 切换音源后，速度会被重置，这里需要重新设置，volume不会被重置，它会在浏览器级别被保持
      audio.value.playbackRate = speed.value

      audio.value.play()
      return
    }
  }

  const playPrev = async () => {
    const lesson = await getPrevLesson(playingLesson.value?.lessonNo)
    if (lesson) {
      play(lesson)
    }
  }

  const playNext = async () => {
    const lesson = await getNextLesson(playingLesson.value?.lessonNo)
    if (lesson) {
      play(lesson)
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
      playNext()
    })

    audio.value.addEventListener("error", () => {
      playNext()
    })
  }

  const STORAGE_KEY = "playingLesson"

  const initPlayingLesson = () => {
    const stored = localStorage.getItem(STORAGE_KEY)
    const speed = localStorage.getItem("speed")
    const volume = localStorage.getItem("volume")
    const currentTime = localStorage.getItem("currentTime")

    if (speed) {
      setSpeed(Number(speed))
    }

    if (volume) {
      setVolume(Number(volume))
    }

    if (currentTime) {
      audio.value.currentTime = Number(currentTime)
    }

    if (stored) {
      const lesson = JSON.parse(stored) as Lesson
      playingLesson.value = lesson
      audio.value.src = lesson.url
    }
  }

  watch(playingLesson, (newLesson) => {
    if (newLesson) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newLesson))
    }
  })

  watch(() => volume.value, (newVolume) => {
    if (audio.value) {
      // Ensure volume is between 0 and 1
      const normalizedVolume = newVolume / 100
      audio.value.volume = normalizedVolume

      localStorage.setItem("volume", String(newVolume))
    }
  })

  watch(() => speed.value, (newSpeed) => {
    if (audio.value) {
      audio.value.playbackRate = newSpeed

      localStorage.setItem("speed", String(newSpeed))
    }
  })

  window.addEventListener("beforeunload", () => {
    localStorage.setItem("currentTime", String(currentTime.value))
  })

  initEvents()
  initPlayingLesson()

  return {
    playingLesson,
    isPlaying,
    currentTime,
    duration,
    volume,
    setVolume,
    speed,
    setSpeed,
    play,
    pause,
    playPrev,
    playNext,
  }
}

export default usePlayer()