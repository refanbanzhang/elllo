<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from "vue"
import { useRouter } from "vue-router"
import IconPrev from "@/assets/prev.svg"
import IconNext from "@/assets/next.svg"
import IconPlay from "@/assets/play.svg"
import IconPause from "@/assets/pause.svg"
import IconArrow from "@/assets/arrow.svg"
import IconSettings from "@/assets/settings.svg"
import { getAverageColor, getProxiedImageUrl } from "@/utils"
import usePlayer from "@/composables/use-player"
import { getLessonByNo } from "@/api/audio"
import ProgressBar from "@/components/progress-bar/index.vue"
import useCurrentLesson from "@/composables/use-current-lesson"
import { showLoading, hideLoading } from "@/components/toast"
import Popup from "@/components/popup/index.vue"
import Slider from "@/components/slider/index.vue"
import IconMinClose from "@/assets/volume1.svg"
import IconMediumClose from "@/assets/volume2.svg"
import IconMaxClose from "@/assets/volume3.svg"

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
}

const emit = defineEmits(["close", "update"])

const router = useRouter()
const { playingLesson, isPlaying, currentTime, duration, volume, setVolume, play, pause, playPrev, playNext } = usePlayer
const { lesson, setLesson } = useCurrentLesson
const settingsPopupVisible = ref(false)
const bgColor = ref("#f7f7f8")

const onSettings = () => {
  settingsPopupVisible.value = true
}

const onPrev = async () => {
  await playPrev()

  if (playingLesson.value) {
    setLesson(playingLesson.value)
  }
}

const onNext = async () => {
  await playNext()

  if (playingLesson.value) {
    setLesson(playingLesson.value)
  }
}

const onClose = () => {
  emit("close")
}

const onNavigateTo = () => {
  emit("close")
  router.push(`/lesson/${lesson.value?.lessonNo}`)
}

const loadLesson = async (lessonNo: string) => {
  if (lessonNo) {
    showLoading()
    lesson.value = await getLessonByNo(lessonNo)
    hideLoading()

    if (lesson.value?.img) {
      const img = new Image()
      img.src = getProxiedImageUrl(lesson.value?.img)
      img.addEventListener("load", async (event: Event) => {
        bgColor.value = await getAverageColor(event.target as HTMLImageElement)
      })
    }
  }
}

watch(() => lesson.value?.lessonNo, (newVal, oldVal) => {
  if (newVal && newVal !== oldVal) {
    loadLesson(newVal)
  }
}, { immediate: true })

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === "Escape") {
    emit("close")
  }

  if (event.key === "ArrowLeft") {
    onPrev()
  }

  if (event.key === "ArrowRight") {
    onNext()
  }

  if (event.key === " ") {
    event.preventDefault()

    if (isPlaying.value) {
      pause()
    } else {
      play()
    }
  }
}

onMounted(() => {
  window.addEventListener("keydown", onKeydown)
})

onUnmounted(() => {
  window.removeEventListener("keydown", onKeydown)
})
</script>

<template>
  <div
    v-if="lesson"
    class="lesson"
    :style="{ backgroundColor: bgColor }"
    @click.stop
  >
    <header class="header">
      <IconArrow
        class="icon"
        @click="onClose"
      />
      <h1 class="title">
        {{ lesson.title }}
      </h1>
    </header>
    <main>
      <div
        v-if="lesson.img"
        class="cover"
        :style="{
          backgroundImage: `url(${getProxiedImageUrl(lesson.img)})`,
          'view-transition-name': `audio-${lesson.lessonNo}`
        }"
      />
      <div class="info">
        <div class="info__lesson-no">
          {{ lesson.lessonNo }}
        </div>
        <div
          class="info__title"
          @click="onNavigateTo"
        >
          {{ lesson.title }}
        </div>
        <div
          v-if="playingLesson?.lessonNo === lesson.lessonNo"
          class="info__progress"
        >
          <ProgressBar :model-value="currentTime / duration * 100" />
          <div class="info__time">
            <span>{{ formatTime(currentTime) }}</span>
            <span>{{ formatTime(duration) }}</span>
          </div>
        </div>
      </div>
    </main>
    <footer class="footer">
      <IconPrev class="icon-prev" @click="onPrev()" />
      <button
        v-if="isPlaying && playingLesson?.lessonNo === lesson.lessonNo"
        class="btn"
        @click="pause()"
      >
        <IconPause class="icon" />
      </button>
      <button
        v-else
        class="btn"
        @click="play(lesson)"
      >
        <IconPlay class="icon" />
      </button>
      <IconNext class="icon-next" @click="onNext()" />
      <IconSettings
        class="settings"
        @click="onSettings"
      />
    </footer>
    <Popup :visible="settingsPopupVisible">
      <div class="settings-popup">
        <div class="settings-popup__close" @click="settingsPopupVisible = false">close</div>
        <div class="volume-group">
          <IconMinClose class="volume" v-if="volume <= 30" />
          <IconMediumClose class="volume" v-else-if="volume <= 60" />
          <IconMaxClose class="volume" v-else />
        </div>
        <Slider
          :model-value="volume"
          v-on:update:model-value="setVolume"
        />
      </div>
    </Popup>
  </div>
</template>

<style lang="less" scoped>
.lesson {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 15px;
  color: #fff;
  background-image: linear-gradient(rgba(0, 0, 0, .2), rgba(0, 0, 0, .6) 80%);
}

.header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
}

.title {
  flex: 1;
  text-align: center;
  font-size: 16px;
}

main {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: auto;
}

.cover {
  flex: 1;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  filter: drop-shadow(0 0 1px rgba(0, 0, 0, .3)) drop-shadow(0 0 10px rgba(0, 0, 0, .3));
}

.content {
  flex: 1;
  overflow: auto;

  :deep(p) {
    margin-bottom: 10px;
  }

  :deep(img) {
    display: block;
    margin-top: 5px;
    margin-bottom: 5px;
  }
}

.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
}

.icon {
  width: 25px;
  height: 25px;
  fill: currentColor;
}

.icon-prev,
.icon-next {
  width: 32px;
  height: 32px;
  fill: currentColor;
}

.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 35px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: white;
}

.info__title {
  font-size: 16px;
  margin-bottom: 20px;
}

.info__time {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  color: rgb(179, 179, 179);
  font-size: 12px;
}

.settings {
  position: absolute;
  bottom: 15px;
  left: 15px;
  width: 30px;
  height: 30px;
  fill: currentColor;
}

.settings-popup{
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding: 20px;
  color: #fff;
  background: #000;
}

.settings-popup__close {
  position: absolute;
  top: 15px;
  right: 15px;
  color: #fff;
  font-size: 16px;
}

.volume-group {
  display: flex;
  justify-content: center;
  align-items: center;
}

.volume {
  width: 25px;
  height: 25px;
  fill: currentColor;
}
</style>

