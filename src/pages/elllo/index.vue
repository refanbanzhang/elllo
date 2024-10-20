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

    // 这里加这个有什么用？
    // 如果不加这个，会报错：
    // runtime-dom.esm-bundler.js:660 Uncaught (in promise) AbortError: The play() request was interrupted by a new load request.
    await nextTick()
    // 由于上面更新audioIndex.value是一个异步操作
    // 这里调用play时，audioElement.value的src还是旧的
    // 可是不应会播放旧的src吗？难道是正要播放旧的src时，src更新了？导致旧的播放不了
    // 新的也播放不了？
    if (audioElement.value) {
      audioElement.value.playbackRate = playbackRate.value
    }
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
  localStorage.setItem("playbackRate", newRate.toString())
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
  const playbackRateString = localStorage.getItem("playbackRate")
  if (lastPlayedIndex) {
    audioIndex.value = parseInt(lastPlayedIndex)
  }
  if (playbackRateString) {
    playbackRate.value = parseFloat(playbackRateString)
  }
}

onMounted(() => {
  loadLastPlayedIndex()
  restoreScrollPosition()
})
</script>

<template>
  <div>
    <header>
      <h1 class="title">
        Elllo
      </h1>
      <audio
        class="audio"
        ref="audioElement"
        :src="audioSrc"
        controls
        @ended="playNextAudio"
      />
      <t-slider
        v-model="playbackRate"
        :marks="marksRange"
        :min="0.5"
        :max="2"
        :step="0.5"
      />
    </header>
    <main ref="mainElement">
      <ul>
        <li
          :class="['audio', audioIndex === index ? 'audio--active' : '']"
          v-for="(url, index) in audios"
          :id="`audio-${index}`"
          :key="url"
        >
          <div
            class="audio__link"
            :href="url"
          >
            {{ url }}
          </div>
          <t-button
            v-if="audioIndex === index && isPlaying"
            size="small"
            theme="primary"
            @click="pauseAudio"
          >
            暂停
          </t-button>
          <t-button
            v-else
            size="small"
            theme="primary"
            @click="onPlay(index)"
          >
            播放
          </t-button>
        </li>
      </ul>
    </main>
  </div>
</template>

<style lang='less' scoped>
header {
  padding: 15px;
  background: #f7f7f8;
}

main {
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