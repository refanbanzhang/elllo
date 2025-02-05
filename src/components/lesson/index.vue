<script setup lang="ts">
import IconPrev from "@/assets/prev.svg"
import IconNext from "@/assets/next.svg"
import IconPlay from "@/assets/play.svg"
import IconPause from "@/assets/pause.svg"
import IconArrow from "@/assets/arrow.svg"
import IconSettings from "@/assets/settings.svg"
import IconVolume from "@/assets/volume.svg"

import { ref, watch, onMounted, onUnmounted, computed } from "vue"
import { useRouter } from "vue-router"
import { getAverageColor, getProxiedImageUrl } from "@/utils"
import { getLessonByNo } from "@/api/audio"
import playerStore from "@/stores/player"
import currentLessonStore from "@/stores/current-lesson"
import { showLoading, hideLoading } from "@/components/toast"
import Slider from "@/components/slider/index.vue"
import Picker from "@/components/picker/index.vue"
import sleepTimerStore from "@/stores/sleep-timer"
import SettingsPopup from "./settings-popup.vue"
import VolumePopup from "./volume-popup.vue"

interface SpeedOption {
  label: string
  value: number
}

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
}

const emit = defineEmits(["close"])

const router = useRouter()
const { playingLesson, isPlaying, currentTime, duration, percentage, updatePercentage, speed, setSpeed, play, pause, playPrev, playNext } = playerStore
const { lesson, setLesson } = currentLessonStore
const { sleepTimer, sleepTimerOptions, setSleepTimer } = sleepTimerStore
const settingsPopupVisible = ref(false)
const volumePopupVisible = ref(false)
const sleepTimerPopupVisible = ref(false)
const speedVisible = ref(false)

const bgColor = ref("#f7f7f8")

const speedOptions: SpeedOption[] = [
  { label: "0.5x", value: 0.5 },
  { label: "1x", value: 1 },
  { label: "1.5x", value: 1.5 },
  { label: "2x", value: 2 },
]

const onChangeSleepTimer = (option: SpeedOption) => {
  setSleepTimer(option.value)
  sleepTimerPopupVisible.value = false
}

const onChangeSpeed = (option: SpeedOption) => {
  setSpeed(option.value)
  speedVisible.value = false
}

const onSettings = () => {
  settingsPopupVisible.value = true
}

const onVolume = () => {
  volumePopupVisible.value = true
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

const imgSrc = computed(() => lesson.value?.img ? getProxiedImageUrl(lesson.value?.img) : "")

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
      <IconSettings
        class="settings-btn"
        @click="onSettings()"
      />
    </header>
    <main>
      <div
        v-if="lesson.img"
        class="cover"
        :style="{
          backgroundImage: `url(${imgSrc})`,
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
          <Slider
            :value="percentage"
            @change="updatePercentage($event)"
          />
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
      <IconVolume class="volume-btn" @click="onVolume()" />
    </footer>
    <SettingsPopup
      :visible="settingsPopupVisible"
      @close="settingsPopupVisible = false"
      @sleep-timer="sleepTimerPopupVisible = true"
      @speed="speedVisible = true"
    />
    <VolumePopup
      :visible="volumePopupVisible"
      @close="volumePopupVisible = false"
    />
    <Picker
      v-if="sleepTimerPopupVisible"
      :visible="sleepTimerPopupVisible"
      :value="sleepTimer"
      :options="sleepTimerOptions"
      @close="sleepTimerPopupVisible = false"
      @change="onChangeSleepTimer($event)"
    />
    <Picker
      v-if="speedVisible"
      :value="speed"
      :visible="speedVisible"
      :options="speedOptions"
      @close="speedVisible = false"
      @change="onChangeSpeed($event)"
    />
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

.settings-btn {
  width: 30px;
  height: 30px;
  fill: currentColor;
}

.volume-btn {
  position: absolute;
  left: 15px;
  bottom: 15px;
  width: 20px;
  height: 20px;
  fill: currentColor;
}
</style>

