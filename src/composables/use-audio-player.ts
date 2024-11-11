import { ref, watch } from "vue"

import data from "../../audios.json"
import type { AudioItem } from "@/types"

const getNextLessonNo = (currentLessonNo: string): string => {
  const currentIndex = audios.value.findIndex((item) => item.lessonNo === currentLessonNo)
  const nextIndex = currentIndex + 1
  return nextIndex < audios.value.length
    ? audios.value[nextIndex].lessonNo
    : audios.value[0].lessonNo
}

const audio = ref<HTMLAudioElement>(new Audio())
const currentLessonNo = ref<string>()
const audios = ref<AudioItem[]>(data)
const currentTime = ref<number>(audio.value.currentTime)
const isPlaying = ref<boolean>(false)
const playbackRate = ref<number>(1)
const duration = ref<number>(0)

const setCurrentLessonNo = (lessonNo: string) => {
  currentLessonNo.value = lessonNo
}

const setPlaybackRate = (rate: number) => {
  playbackRate.value = rate
}

const setAudioSrc = (src: string) => {
  audio.value.src = src
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
  setAudioSrc(audios.value.find((item) => item.lessonNo === lessonNo)?.url || "")
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
  // 现在要去掉currentIndex，改为currentLessonNo，如何获取下一个lessonNo？
  play(getNextLessonNo(currentLessonNo.value || ""))
})

audio.value.addEventListener("error", () => {
  console.log("音频播放错误")
  play(getNextLessonNo(currentLessonNo.value || ""))
})

// 监听播放速度的调整，然后同步到audioElement.value以及localStorage
watch(() => playbackRate.value, (newRate) => {
  audio.value.playbackRate = newRate
  localStorage.setItem("playbackRate", newRate.toString())
})

setAudioSrc(audios.value.find((item) => item.lessonNo === currentLessonNo.value)?.url || "")

const useAudioPlayer = () => {
  return {
    play,
    pause,
    resume,
    isPlaying,
    audios,
    playbackRate,
    setPlaybackRate,
    currentLessonNo,
    setCurrentLessonNo,
    currentTime,
    duration,
  }
}

export default useAudioPlayer
