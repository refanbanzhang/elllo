import { ref } from "vue"
import { getAudio, getNextAudio } from "@/api/audio"
import type { AudioItem } from "@/types"

const createAudioPlayer = () => {
  const audioInstance = ref<HTMLAudioElement>(new Audio())
  const currentTime = ref<number>(audioInstance.value.currentTime)
  const isPlaying = ref<boolean>(false)
  const duration = ref<number>(0)
  const activeLesson = ref<AudioItem>()

  const pause = () => {
    audioInstance.value.pause()
  }

  const resume = () => {
    audioInstance.value.play()
  }

  // 设置音频播放内容
  // 设置当前音频编号
  // 缓存当前播放的音频编号
  const setAudio = (audio: AudioItem) => {
    activeLesson.value = audio
    audioInstance.value.src = audio.url
    // currentLessonNo.value = audio.lessonNo
    // localStorage.setItem("lastPlayedLessonNo", audio.lessonNo)
  }

  const playAudio = (audio: AudioItem) => {
    activeLesson.value = audio
    audioInstance.value.src = audio.url
    audioInstance.value.play()
  }

  const play = async (audio: AudioItem) => {
    try {
      pause()
      setAudio(audio)
      playAudio(audio)
    } catch (error) {
      console.error(error)
    }
  }

  const playNextAudio = async () => {
    const nextAudio = await getNextAudio(activeLesson.value?.lessonNo || "")
    if (nextAudio) {
      play(nextAudio)
     }
  }

  const initEvents = () => {
    audioInstance.value.addEventListener("play", () => {
      isPlaying.value = true
    })

    audioInstance.value.addEventListener("pause", () => {
      isPlaying.value = false
    })

    audioInstance.value.addEventListener("timeupdate", () => {
      currentTime.value = audioInstance.value.currentTime
    })

    audioInstance.value.addEventListener("durationchange", () => {
      duration.value = audioInstance.value.duration
    })

    audioInstance.value.addEventListener("ended", () => {
      playNextAudio()
    })

    audioInstance.value.addEventListener("error", () => {
      playNextAudio()
    })
  }

  const init = async () => {
    initEvents()

    const lastPlayedLessonNo = localStorage.getItem("lastPlayedLessonNo")
    if (lastPlayedLessonNo) {
      const audio = await getAudio(lastPlayedLessonNo)
      setAudio(audio)
    } else {
      const nextAudio = await getNextAudio()
      if (nextAudio) {
        setAudio(nextAudio)
      }
    }
  }

  init()

  return {
    activeLesson,
    currentTime,
    duration,
    isPlaying,
    play,
    pause,
    resume,
  }
}

export default createAudioPlayer()