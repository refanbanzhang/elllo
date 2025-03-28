<script setup lang="ts">
import IconPlay from "@/assets/play.svg"
import IconPause from "@/assets/pause.svg"

import { ref, watch } from "vue"
import type { Lesson as LessonType } from "@/types"
import { getAverageColor, getProxiedImageUrl } from "@/utils"
import playerStore from "@/stores/player"
import currentLessonStore from "@/stores/current-lesson"
import usePageLocker from "@/composables/use-page-locker"
import ProgressBar from "@/components/progress-bar/index.vue"
import Popup from "@/components/popup/index.vue"
import Lesson from "@/components/lesson/index.vue"

const { setLesson } = currentLessonStore
const { lockPage, unlockPage } = usePageLocker()
const { playingLesson, isPlaying, currentTime, duration, play, pause } = playerStore

const footerBgColor = ref("rgb(49, 128, 153)")
const visible = ref(false)

const onOpen = (lesson: LessonType) => {
  setLesson(lesson)
  visible.value = true
}

const onClose = () => {
  visible.value = false
}

const onImageLoad = async (event: Event) => {
  const imgEl = event.target as HTMLImageElement
  footerBgColor.value = await getAverageColor(imgEl)
}

watch(() => visible.value , (newVal) => {
  if (newVal) {
    lockPage()
  } else {
    unlockPage()
  }
})

defineExpose({
  open: onOpen,
})
</script>

<template>
  <div
    v-if="playingLesson"
    class="player"
    @click.stop="onOpen(playingLesson)"
  >
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
          @load="onImageLoad"
        />
        <div class="player__info">
          <div class="player__title">
            {{ playingLesson?.title }}
          </div>
          <div class="player__lesson-no">
            {{ playingLesson?.lessonNo }}
          </div>
        </div>
        <button
          v-if="isPlaying"
          @click.stop="pause()"
        >
          <IconPause class="icon" />
        </button>
        <button
          v-else
          @click.stop="play()"
        >
          <IconPlay class="icon" />
        </button>
        <div class="progress-bar-wrapper">
          <ProgressBar :value="currentTime / duration * 100" />
        </div>
      </div>
    </div>
  </div>
  <Popup
    :visible="visible"
    @close="onClose"
  >
    <Lesson @close="onClose" />
  </Popup>
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

  &__info {
    flex: 1;
    margin-right: 5px;
    font-size: 12px;
  }

  &__title {
    color: #fff;
    font-weight: bold;
    margin-bottom: 5px;
  }

  &__lesson-no {
    color: #ccc;
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
