<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from "vue"
import IconPrev from "@/assets/prev.svg"
import IconNext from "@/assets/next.svg"
import IconPlay from "@/assets/play.svg"
import IconPause from "@/assets/pause.svg"
import IconArrow from "@/assets/arrow.svg"
import { getAverageColor, getProxiedImageUrl, updateHtmlImgUrl } from "@/utils"
import usePlayer from "@/composables/use-player"
import { getLessonByNo } from "@/api/audio"
import type { Lesson } from "@/types"
import { showLoading, hideLoading } from "@/components/toast"

const props = defineProps<{
  data: Lesson
}>()

const emit = defineEmits(["close", "update"])

const { playingLesson, isPlaying, play, pause, playPrev, playNext } = usePlayer

const bgColor = ref("#f7f7f8")
const visibleContent = ref(false)
const data = ref<Lesson | null>(null)

const onPrev = async () => {
  await playPrev()
  emit("update", playingLesson.value)
}

const onNext = async () => {
  await playNext()
  emit("update", playingLesson.value)
}

const onClose = () => {
  emit("close")
}

const toggleContent = () => {
  visibleContent.value = !visibleContent.value
}

const loadLesson = async (lessonNo: string) => {
  if (lessonNo) {
    showLoading()
    data.value = await getLessonByNo(lessonNo)
    hideLoading()

    if (data.value?.img) {
      const img = new Image()
      img.src = getProxiedImageUrl(data.value?.img)
      img.addEventListener("load", async (event: Event) => {
        bgColor.value = await getAverageColor(event.target as HTMLImageElement)
      })
    }
  }
}

watch(() => props.data.lessonNo, (newVal, oldVal) => {
  if (newVal !== oldVal) {
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
    v-if="data"
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
        {{ data.title }}
      </h1>
    </header>
    <main>
      <div
        v-if="data.img && !visibleContent"
        class="cover"
        :style="{
          backgroundImage: `url(${getProxiedImageUrl(data.img)})`,
          'view-transition-name': `audio-${data.lessonNo}`
        }"
        @click="toggleContent"
      />
      <div
        v-if="data.html && visibleContent"
        class="content"
        v-html="updateHtmlImgUrl(data.html)"
        @click="toggleContent"
      />
    </main>
    <footer class="footer">
      <IconPrev class="icon-prev" @click="onPrev()" />
      <button
        v-if="isPlaying && playingLesson?.lessonNo === data.lessonNo"
        class="btn"
        @click="pause()"
      >
        <IconPause class="icon" />
      </button>
      <button
        v-else
        class="btn"
        @click="play(data)"
      >
        <IconPlay class="icon" />
      </button>
      <IconNext class="icon-next" @click="onNext()" />
    </footer>
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
  isolation: isolate;
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
</style>
