<script setup lang="ts">
import useAudioPlayer from "../../composables/use-audio-player"

const { play, pause, resume, currentIndex, isPlaying, items } = useAudioPlayer([
  "https://s3-us-west-1.amazonaws.com/elllo-audio/mixer-001-150/004-MXR-cinema.mp3",
  "https://s3-us-west-1.amazonaws.com/elllo-audio/mixer-001-150/003-MXR-catsdogs.mp3"
])
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
        v-else-if="currentIndex === index && !isPlaying"
      >
        继续
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
