<script setup lang="ts">
import { ref } from "vue"

const audio = ref<HTMLAudioElement>(new Audio())
const currentIndex = ref<number>(0)
const items = ref<string[]>([
  "https://s3-us-west-1.amazonaws.com/elllo-audio/mixer-001-150/004-MXR-cinema.mp3",
  "https://s3-us-west-1.amazonaws.com/elllo-audio/mixer-001-150/003-MXR-catsdogs.mp3",
])

const handlePlayError = (error: any) => {
  console.error("音频播放失败:", error)
  // 这里可以添加错误处理逻辑，比如显示错误消息给用户
}

const playAudio = (index: number) => {
  audio.value.src = items.value[index]
  audio.value.play().catch(handlePlayError)
}

// 监听音频播放结束事件
audio.value.addEventListener("ended", () => {
  // 可以在这里添加播放结束后的逻辑，比如自动播放下一首
})

const play = (index: number) => {
  // 情况一：
  // 切换歌曲
  if (currentIndex.value !== index) {
    audio.value.pause()
    playAudio(index)
    currentIndex.value = index
    return
  }

  // 情况二：
  // 正在播放时暂停
  if (audio.value.currentTime > 0 && !audio.value.paused) {
    audio.value.pause()
    return
  }

  // 情况三：
  // 暂停时播放
  if (audio.value.currentTime > 0 && audio.value.paused) {
    audio.value.play().catch(handlePlayError)
    return
  }

  // 情况四：
  // 初始化播放
  playAudio(index)
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
