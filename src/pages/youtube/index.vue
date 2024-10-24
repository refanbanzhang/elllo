<script setup lang="ts">
import { computed, ref } from "vue"

const audio = ref<HTMLAudioElement>(new Audio())
const currentIndex = ref<number>()
const items = ref<string[]>([
  "https://s3-us-west-1.amazonaws.com/elllo-audio/mixer-001-150/004-MXR-cinema.mp3",
  "https://s3-us-west-1.amazonaws.com/elllo-audio/mixer-001-150/003-MXR-catsdogs.mp3",
])

const currentTime = ref<number>(audio.value.currentTime)
const isPaused = ref<boolean>(audio.value.paused)
const isPlaying = computed<boolean>(() => !isPaused.value)

audio.value.addEventListener("play", () => {
  isPaused.value = false
})

audio.value.addEventListener("pause", () => {
  isPaused.value = true
})

audio.value.addEventListener("timeupdate", () => {
  currentTime.value = audio.value.currentTime
})

audio.value.addEventListener("ended", () => {
  console.log("音频播放结束")
})

audio.value.addEventListener("error", () => {
  console.log("音频播放错误")
})


const play = (index: number) => {
  pause()
  currentIndex.value = index
  audio.value.src = items.value[index]
  audio.value.play()
}

const pause = () => {
  audio.value.pause()
}

const resume = () => {
  audio.value.play()
}
</script>

<template>
  <div>
    youtube
    <div
      v-for="(_, index) in items"
      :key="index"
    >
      <button
        @click="pause"
        v-if="currentIndex === index && isPlaying"
      >
        暂停
      </button>
      <button
        @click="resume"
        v-else-if="currentIndex === index && isPaused"
      >
        播放
      </button>
      <button
        v-else
        @click="play(index)"
      >
        播放
      </button>
    </div>
  </div>
</template>

<style scoped>
</style>
