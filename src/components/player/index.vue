<script setup lang="ts">
import { ref } from "vue"
import IconPlay from "@/assets/play.svg"
import IconPause from "@/assets/pause.svg"
import { getAverageColor, getProxiedImageUrl } from "@/utils"
import player from "@/composables/use-player"
import ProgressBar from "@/components/progress-bar/index.vue"

const emit = defineEmits(["open"])

const { playingLesson, isPlaying, currentTime, duration, play, pause } = player
const footerBgColor = ref("rgb(49, 128, 153)")

const onImageLoad = async (event: Event) => {
  const imgEl = event.target as HTMLImageElement
  footerBgColor.value = await getAverageColor(imgEl)
}
</script>

<template>
  <div class="player" v-if="playingLesson">
    <div class="player__content">
      <div
        class="player__content-inner"
        :style="{ backgroundColor: footerBgColor }"
      >
        <img
          v-if="playingLesson?.img"
          class="player__img"
          :style="{ 'view-transition-name': `audio-${playingLesson.lessonNo}` }"
          :src="getProxiedImageUrl(playingLesson.img)"
          :alt="playingLesson?.title"
          @click.stop="emit('open', playingLesson)"
          @load="onImageLoad"
        />
        <div class="player__title">
          {{ playingLesson?.title }}
        </div>
        <button
          v-if="isPlaying"
          @click="pause()"
        >
          <IconPause class="icon" />
        </button>
        <button
          v-else
          @click="play()"
        >
          <IconPlay class="icon" />
        </button>
        <div class="progress-bar-wrapper">
          <ProgressBar :model-value="currentTime / duration * 100" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.player {
  &__content {
    padding: 10px;
  }

  &__content-inner {
    position: relative;
    z-index: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    padding: 10px;
    transition: background-color .2s ease-in-out;

    &:after {
      content: "";
      position: absolute;
      inset: 0;
      z-index: -1;
      background: rgba(0, 0, 0, .48);
    }
  }

  &__img {
    margin-right: 10px;
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 6px;
  }

  &__title {
    flex: 1;
    margin-right: 5px;
    color: #fff;
    font-weight: bold;
  }
}

.icon {
  width: 25px;
  height: 25px;
  color: #fff;
}

.progress-bar-wrapper {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
