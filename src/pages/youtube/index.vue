<script setup lang="ts">
import { ref } from "vue"

const audio = ref<HTMLAudioElement>(new Audio())
const currentIndex = ref<number>(0)
const items = ref<string[]>([
  "https://s3-us-west-1.amazonaws.com/elllo-audio/mixer-001-150/004-MXR-cinema.mp3",
  "https://s3-us-west-1.amazonaws.com/elllo-audio/mixer-001-150/003-MXR-catsdogs.mp3",
])

audio.value.addEventListener("ended", () => {
  console.log("音频播放结束")
})

audio.value.addEventListener("error", () => {
  console.log("音频播放错误")
})

const play = (index: number) => {
  const isCurrentAudio = currentIndex.value === index
  const isPaused = audio.value.paused && audio.value.currentTime > 0
  const isPlaying = !audio.value.paused && audio.value.currentTime > 0

  // 情况1：暂停正在播放的歌曲
  if (isCurrentAudio && isPlaying) {
    audio.value.pause()
    return
  }

  // 情况2：播放暂停的歌曲
  if (isCurrentAudio && isPaused) {
    audio.value.play()
    return
  }

  // 情况3：播放指定歌曲
  audio.value.pause()
  currentIndex.value = index
  audio.value.src = items.value[index]
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
      <button @click="play(index)">
        播放{{ index }}
      </button>
    </div>
  </div>
</template>

<style scoped>
</style>
