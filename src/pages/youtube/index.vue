<script setup lang="ts">
import useAudioPlayer from "../../composables/use-audio-player"

const { play, pause, resume, currentIndex, isPlaying, audios } = useAudioPlayer()
</script>

<template>
  <div>
    youtube
    <div
      v-for="(_, index) in audios"
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
