<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router"
import IconPrev from "@/assets/prev.svg"
import IconNext from "@/assets/next.svg"
import IconPlay from "@/assets/play.svg"
import IconPause from "@/assets/pause.svg"
import IconArrow from "@/assets/arrow.svg"
import { getAverageColor, getProxiedImageUrl, updateHtmlImgUrl } from "@/utils"
import usePlayer from "@/composables/use-player"
import { getLessonByNo } from "@/api/audio"
import type { Lesson } from "@/types"

const route = useRoute()
const router = useRouter()
const { playingLesson, isPlaying, isPaused, pause, resume, play } = usePlayer
const bgColor = ref("#f7f7f8")
const visibleContent = ref(false)
const data = ref<Lesson | null>(null)

const handleBack = () => {
  router.back()
}

const toggleContent = () => {
  visibleContent.value = !visibleContent.value
}

onMounted(async () => {
  const lessonNo = route.params.lessonNo as string
  if (lessonNo) {
    data.value = await getLessonByNo(lessonNo)

    if (data.value?.img) {
      const img = new Image()
      img.src = getProxiedImageUrl(data.value?.img)
      img.addEventListener("load", async (event: Event) => {
        bgColor.value = await getAverageColor(event.target as HTMLImageElement)
      })
    }
  }
})
</script>

<template>
  <div
    v-if="data"
    class="page"
    :style="{ backgroundColor: bgColor }"
  >
    <header class="header">
      <IconArrow
        class="icon"
        @click="handleBack"
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
      <IconPrev class="icon-prev" />
      <button
        v-if="data.lessonNo !== playingLesson?.lessonNo"
        class="btn"
        @click="play(data)"
      >
        <IconPlay class="icon" />
      </button>
      <button
        v-if="playingLesson && data.lessonNo === playingLesson.lessonNo && isPlaying"
        class="btn"
        @click="pause"
      >
        <IconPause class="icon" />
      </button>
      <button
        v-if="playingLesson && data.lessonNo === playingLesson.lessonNo && isPaused"
        class="btn"
        @click="resume"
      >
        <IconPlay class="icon" />
      </button>
      <IconNext class="icon-next" />
    </footer>
  </div>
</template>

<style lang="less" scoped>
.page {
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
</style>
