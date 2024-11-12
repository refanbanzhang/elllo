<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router"
import IconPlay from "@/assets/play.svg"
import IconPause from "@/assets/pause.svg"
import { getAverageColor, getProxiedImageUrl } from "@/utils"
import ProgressBar from "@/components/progress-bar/index.vue"
import useAudioPlayer from "@/composables/use-audio-player"

const router = useRouter()
const { audios, currentLessonNo, currentTime, duration, isPlaying, pause, resume } = useAudioPlayer()

const footerBgColor = ref("rgb(49, 128, 153)")
const currentLesson = computed(() => audios.value.find((item) => item.lessonNo === currentLessonNo.value))

const onImageLoad = async (event: Event) => {
  const imgEl = event.target as HTMLImageElement
  footerBgColor.value = await getAverageColor(imgEl)
}

const goToLesson = (lessonNo: string) => {
  if ("startViewTransition" in document) {
    document.startViewTransition(() => {
      router.push(`/elllo/${lessonNo}`)
    })
  } else {
    router.push(`/elllo/${lessonNo}`)
  }
}
</script>

<template>
  <div class="player">
    <div class="player__content">
      <div
        class="player__content-inner"
        :style="{ backgroundColor: footerBgColor }"
      >
        <img
          v-if="currentLesson?.img"
          class="player__img"
          :style="{ 'view-transition-name': `audio-${currentLesson.lessonNo}` }"
          :src="getProxiedImageUrl(currentLesson.img)"
          :alt="currentLesson?.title"
          @click.stop="goToLesson(currentLesson.lessonNo)"
          @load="onImageLoad"
        >
        <div class="player__title">
          {{ currentLesson?.title }}
        </div>
        <button
          v-if="!isPlaying"
          class="btn"
          @click="resume"
        >
          <IconPlay class="icon" />
        </button>
        <button
          v-if="isPlaying"
          class="btn"
          @click="pause"
        >
          <IconPause class="icon" />
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
  position: sticky;
  bottom: 0;

  &__content {
    padding: 15px;
  }

  &__content-inner {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 80px;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    background-color: rgb(49, 128, 153);
    padding: 10px;
    transition: background-color .2s ease-in-out;

    &:after {
      background: rgba(0, 0, 0, .48);
      bottom: 0;
      content: "";
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
      z-index: -1;
    }
  }

  &__img {
    margin-right: 10px;
    width: 50px;
    height: 50px;
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
}

.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: white;
}

.progress-bar-wrapper {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
