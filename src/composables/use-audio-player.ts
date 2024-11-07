import { ref, watch } from "vue"

import data from "../../audios.json"
import type { AudioItem } from "@/types"

const audio = ref<HTMLAudioElement>(new Audio())
const currentIndex = ref<number>(0)
const audios = ref<AudioItem[]>(data)
const currentTime = ref<number>(audio.value.currentTime)
const isPlaying = ref<boolean>(false)
const playbackRate = ref<number>(1)
const duration = ref<number>(0)

const useAudioPlayer = () => {
  const setPlaybackRate = (rate: number) => {
    playbackRate.value = rate
  }

  const setAudioSrc = (src: string) => {
    audio.value.src = src
  }

  const play = (index: number) => {
    pause()
    currentIndex.value = index
    setAudioSrc(audios.value[index].url)
    audio.value.playbackRate = playbackRate.value
    audio.value.play()
    localStorage.setItem("lastPlayedIndex", index.toString())
  }

  const pause = () => {
    audio.value.pause()
  }

  const resume = () => {
    audio.value.play()
  }

  const setCurrentIndex = (index: number) => {
    currentIndex.value = index
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
    play(currentIndex.value + 1)
  })

  audio.value.addEventListener("error", () => {
    console.log("音频播放错误")
    play(currentIndex.value + 1)
  })

  // 监听播放速度的调整，然后同步到audioElement.value以及localStorage
  watch(() => playbackRate.value, (newRate) => {
    audio.value.playbackRate = newRate
    localStorage.setItem("playbackRate", newRate.toString())
  })

  setAudioSrc(audios.value[currentIndex.value].url)

  return {
    play,
    pause,
    resume,
    currentIndex,
    isPlaying,
    audios,
    playbackRate,
    setPlaybackRate,
    setCurrentIndex,
    currentTime,
    duration,
  }
}

export default useAudioPlayer
