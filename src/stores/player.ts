import { ref, watch, computed } from "vue"
import type { Lesson } from "@/types"
import { getNextLesson, getPrevLesson } from "@/api/audio"

const STORAGE_KEY = "playingLesson"
const STORAGE_SPEED_KEY = "speed"
const STORAGE_VOLUME_KEY = "volume"
const STORAGE_CURRENT_TIME_KEY = "currentTime"

const audio = ref<HTMLAudioElement>(new Audio())
const playingLesson = ref<Lesson | null>(null)
const isPlaying = ref<boolean>(false)
const speed = ref<number>(1)
const volume = ref<number>(100)
const duration = ref<number>(0)
const currentTime = ref<number>(audio.value.currentTime)

const updatePercentage = (percentage: number) => {
  const time = (percentage / 100) * duration.value
  audio.value.currentTime = time
  currentTime.value = time
}

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

  // 传入 lesson 且和当前播放的 lesson 不同，更新播放器，播放
  if (lesson && playingLesson.value?.lessonNo !== lesson.lessonNo) {
    playingLesson.value = lesson
    audio.value.src = lesson.url

    // 切换音源后，速度会被重置，这里需要重新设置，volume不会被重置，它会在浏览器级别被保持
    audio.value.playbackRate = speed.value
  }

  audio.value.play()
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

  window.addEventListener("beforeunload", () => {
    localStorage.setItem("currentTime", String(currentTime.value))
  })
}

const initStorage = () => {
  const stored = localStorage.getItem(STORAGE_KEY)
  const speed = localStorage.getItem(STORAGE_SPEED_KEY)
  const volume = localStorage.getItem(STORAGE_VOLUME_KEY)
  const currentTime = localStorage.getItem(STORAGE_CURRENT_TIME_KEY)

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

watch(playingLesson, (value) => {
  if (value) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
  }
})

watch(volume, (value) => {
  // Ensure volume is between 0 and 1
  const normalizedVolume = value / 100

  audio.value.volume = normalizedVolume
  localStorage.setItem(STORAGE_VOLUME_KEY, String(value))
})

watch(speed, (value) => {
  audio.value.playbackRate = value
  localStorage.setItem(STORAGE_SPEED_KEY, String(value))
})

const percentage = computed(() => currentTime.value / duration.value * 100)

initEvents()
initStorage()

export default {
  playingLesson,
  isPlaying,
  currentTime,
  duration,
  percentage,
  updatePercentage,
  volume,
  setVolume,
  speed,
  setSpeed,
  play,
  pause,
  playPrev,
  playNext,
}