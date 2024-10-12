<script setup lang="ts">
import { computed, onMounted, ref, watch, nextTick } from "vue"
import audios from "./audios.json"

const marksRange = ref({
  0.5: "0.5",
  1: "1",
  1.5: "1.5",
  2: "2",
})
const audioElement = ref<HTMLAudioElement | null>(null)
const playbackRate = ref<number>(1)
const audioIndex = ref<number>(0)
const isPlaying = ref<boolean>(false)
const mainElement = ref<HTMLElement | null>(null)
const isPaused = computed<boolean>(() => !isPlaying.value && (audioElement.value?.currentTime ?? 0) > 0)
const audioSrc = computed<string>(() => audios[audioIndex.value])

const onPlay = (index: number) => {
  if (isPaused.value) {
    resumeAudio()
  } else {
    playAudio(index)
  }
}

const playAudio = async (index: number) => {
  audioIndex.value = index

  if (isPlaying.value) {
    audioElement.value?.pause()
  }

  try {
    // 这里加这个有什么用
    await nextTick()
    audioElement.value?.play()
    isPlaying.value = true
    localStorage.setItem("lastPlayedIndex", audioIndex.value.toString())
  } catch (error) {
    console.error("播放错误:", error)
    playNextAudio()
  }
}

const playNextAudio = () => {
  playAudio(audioIndex.value + 1)
}

const pauseAudio = () => {
  if (isPlaying.value) {
    audioElement.value?.pause()
    isPlaying.value = false
  }
}

const resumeAudio = () => {
  if (!isPlaying.value) {
    audioElement.value?.play()
    isPlaying.value = true
  }
}

watch(playbackRate, (newRate) => {
  if (audioElement.value) {
    audioElement.value.playbackRate = newRate
  }
})

const scrollToAudio = (index: number) => {
  const audioElement = document.getElementById(`audio-${index}`)

  if (audioElement && mainElement.value) {
    mainElement.value.scrollTop = audioElement.offsetTop - mainElement.value.offsetTop - 15
  }
}

const restoreScrollPosition = () => {
  scrollToAudio(audioIndex.value)
}

const loadLastPlayedIndex = () => {
  const lastPlayedIndex = localStorage.getItem("lastPlayedIndex")
  if (lastPlayedIndex) {
    audioIndex.value = parseInt(lastPlayedIndex)
  }
}

onMounted(() => {
  loadLastPlayedIndex()
  restoreScrollPosition()
})
</script>

<template>
  <div class="container">
    <header>
      <h1 class="title">Elllo</h1>
      <audio class="audio" ref="audioElement" :src="audioSrc" controls @ended="playNextAudio"></audio>
      <t-slider v-model="playbackRate" :marks="marksRange" :min="0.5" :max="2" :step="0.5" />
    </header>
    <main ref="mainElement">
      <ul>
        <li :class="['audio', audioIndex === index ? 'audio--active' : '']" v-for="(url, index) in audios"
          :id="`audio-${index}`" :key="url">
          <div class="audio__link" :href="url">{{ url }}</div>
          <t-button v-if="audioIndex === index && isPlaying" size="small" theme="primary" @click="pauseAudio">
            暂停
          </t-button>
          <t-button v-else size="small" theme="primary" @click="onPlay(index)">播放</t-button>
        </li>
      </ul>
    </main>
  </div>
</template>

<style lang='less' scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

header {
  flex-shrink: 0;
  padding: 15px;
  background: #f7f7f8;
}

main {
  flex: 1;
  overflow: auto;
  padding: 15px;
}

.title {
  text-align: center;
  margin-bottom: 15px;
}

.speed {
  width: 100%;
  margin-bottom: 15px;
  padding: 10px;
}

.audio {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 15px;
  border-radius: 6px;
  padding: 15px;
}

.audio__link {
  margin-right: 10px;
}

.audio--active {
  background: #9b6060;

  .audio__link {
    color: #fff;
  }
}
</style>