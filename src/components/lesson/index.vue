<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, computed } from "vue"
import { useRouter } from "vue-router"
import IconPrev from "@/assets/prev.svg"
import IconNext from "@/assets/next.svg"
import IconPlay from "@/assets/play.svg"
import IconPause from "@/assets/pause.svg"
import IconArrow from "@/assets/arrow.svg"
import IconSettings from "@/assets/settings.svg"
import IconVolume from "@/assets/volume.svg"
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
import Picker from "@/components/picker/index.vue"

type MenuItem = {
  name: string
  action?: () => void
}
type SpeedOption = {
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
const { playingLesson, isPlaying, currentTime, duration, volume, setVolume, speed, setSpeed,play, pause, playPrev, playNext } = usePlayer
const { lesson, setLesson } = useCurrentLesson
const settingsPopupVisible = ref(false)
const volumePopupVisible = ref(false)
const speedVisible = ref(false)
const bgColor = ref("#f7f7f8")

const speedOptions: SpeedOption[] = [
  { label: "0.5x", value: 0.5 },
  { label: "1x", value: 1 },
  { label: "1.5x", value: 1.5 },
  { label: "2x", value: 2 },
]

const onChangeSpeed = (option: SpeedOption) => {
  setSpeed(option.value)
  speedVisible.value = false
}

const menuItems: MenuItem[] = [
  {
    name: "Sleep timer",
    action: () => {
      console.log("sleep timer")
    }
  },
  {
    name: "Set speed",
    action: () => {
      speedVisible.value = true
    }
  },
  {
    name: "Add to playlist",
  },
  {
    name: "Hide song",
  },
  {
    name: "Share",
  },
  {
    name: "View artist",
  },
  {
    name: "Report",
  },
  {
    name: "Song credits",
  }
]

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
        class="icon-settings"
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
          <ProgressBar :value="currentTime / duration * 100" />
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
      <IconVolume class="volume-icon" @click="onVolume()" />
    </footer>
    <Popup
      v-if="settingsPopupVisible"
      :visible="settingsPopupVisible"
      @close="settingsPopupVisible = false"
    >
      <div class="popup">
        <img class="settings-cover" :src="imgSrc" alt="">
        <div class="settings-title">
          {{ lesson.title }}
        </div>
        <div class="settings-lesson-no">
          {{ lesson.lessonNo }}
        </div>
        <div class="menus">
          <div
            class="menu-item"
            v-for="(item, index) in menuItems"
            :key="index"
            @click="item.action?.()"
          >
            {{ item.name }}
          </div>
        </div>
        <div class="popup__close" @click="settingsPopupVisible = false">close</div>
      </div>
    </Popup>
    <Popup
      v-if="volumePopupVisible"
      :visible="volumePopupVisible"
      @close="volumePopupVisible = false"
    >
      <div class="popup">
        <div class="popup__close" @click="volumePopupVisible = false">close</div>
        <div class="volume-group">
          <IconMinClose class="volume" v-if="volume <= 30" />
          <IconMediumClose class="volume" v-else-if="volume <= 60" />
          <IconMaxClose class="volume" v-else />
        </div>
        <Slider
          :value="volume"
          @change="setVolume($event)"
        />
      </div>
    </Popup>
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

.settings-cover {
  margin-top: 40px;
  margin-bottom: 20px;
  width: 100%;
}

.settings-title {
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: 600;
}

.settings-lesson-no {
  margin-bottom: 70px;
  font-size: 16px;
  color: #999;
}

.icon-settings {
  width: 30px;
  height: 30px;
  fill: currentColor;
}

.popup{
  // display: flex;
  // flex-direction: column;
  // justify-content: center;
  overflow: auto;
  height: 100%;
  padding: 20px;
  color: #fff;
  background: #000;
}

.popup__close {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  box-sizing: border-box;
  text-align: center;
  color: #fff;
  font-size: 18px;
  background: #000;
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

.volume-icon {
  position: absolute;
  left: 15px;
  bottom: 15px;
  width: 20px;
  height: 20px;
  fill: currentColor;
}

.menus {
  margin-bottom: 100px;
}

.menu-item {
  padding: 15px 0;
}
</style>

