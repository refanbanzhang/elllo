import { ref, watch } from "vue"

import { AudioItem } from "../../extractAudio"

const useAudioPlayer = (data: AudioItem[]) => {
  const audio = ref<HTMLAudioElement>(new Audio())
  const currentIndex = ref<number>(0)
  const items = ref<AudioItem[]>(data)
  const currentTime = ref<number>(audio.value.currentTime)
  const isPlaying = ref<boolean>(false)
  const playbackRate = ref<number>(1)

  const setPlaybackRate = (rate: number) => {
    playbackRate.value = rate
  }

  const setAudioSrc = (src: string) => {
    audio.value.src = src
  }

  const play = (index: number) => {
    pause()
    currentIndex.value = index
    setAudioSrc(items.value[index].url)
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

  audio.value.addEventListener("ended", () => {
    console.log("音频播放结束")
    play(currentIndex.value + 1)
  })

  audio.value.addEventListener("error", () => {
    console.log("音频播放错误")
    play(currentIndex.value + 1)
  })

  setAudioSrc(items.value[currentIndex.value].url)

  // 监听播放速度的调整，然后同步到audioElement.value以及localStorage
  watch(() => playbackRate.value, (newRate) => {
    audio.value.playbackRate = newRate
    localStorage.setItem("playbackRate", newRate.toString())
  })

  return {
    play,
    pause,
    resume,
    currentIndex,
    isPlaying,
    items,
    playbackRate,
    setPlaybackRate,
    setCurrentIndex,
  }
}

export default useAudioPlayer
