<script setup lang="ts">
import { onMounted, ref } from "vue"
import audios from "./audios.json"
import useAudioPlayer from "../../composables/use-audio-player"

const { play, pause, resume, playbackRate, currentIndex, isPlaying, items, setPlaybackRate, setCurrentIndex } = useAudioPlayer(audios)

const marksRange = ref({
  0.5: "0.5",
  1: "1",
  1.5: "1.5",
  2: "2",
})

const mainElement = ref<HTMLElement | null>(null)
const restoreScrollPosition = () => {
  const audioElement = document.getElementById(`audio-${currentIndex.value}`)
  if (audioElement && mainElement.value) {
    mainElement.value.scrollTop = audioElement.offsetTop - mainElement.value.offsetTop - 15
  }
}

const loadLastPlayedIndex = () => {
  const lastPlayedIndex = localStorage.getItem("lastPlayedIndex")
  const rate = localStorage.getItem("playbackRate")
  if (lastPlayedIndex) {
    setCurrentIndex(parseInt(lastPlayedIndex))
  }
  if (rate) {
    setPlaybackRate(parseFloat(rate))
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
          :class="['audio', currentIndex === index ? 'audio--active' : '']"
          v-for="(url, index) in items"
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
            v-if="currentIndex === index && isPlaying"
            size="small"
            theme="primary"
            @click="pause"
          >
            暂停
          </t-button>
          <t-button
            v-else-if="currentIndex === index && !isPlaying"
            size="small"
            theme="primary"
            @click="resume"
          >
            继续
          </t-button>
          <t-button
            v-else
            size="small"
            theme="primary"
            @click="play(index)"
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