<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router"
import IconPrev from "@/assets/prev.svg"
import IconNext from "@/assets/next.svg"
import IconPlay from "@/assets/play.svg"
import IconPause from "@/assets/pause.svg"
import IconArrow from "@/assets/arrow.svg"
import { HOST } from "@/constant"
import { getAverageColor, getProxiedImageUrl } from "@/utils"
import useAudioPlayer from "@/composables/use-audio-player"

const route = useRoute()
const router = useRouter()
const { audios, isPlaying, pause, resume, play, currentLessonNo } = useAudioPlayer()
const audio = audios.value.find((item) => item.lessonNo === route.params.id)
const bgColor = ref("#f7f7f8")
const visibleContent = ref(false)

const handleImageLoad = async (event: Event) => {
  const imgEl = event.target as HTMLImageElement
  bgColor.value = await getAverageColor(imgEl)
}

if (audio?.img) {
  const img = new Image()
  img.src = getProxiedImageUrl(audio.img)
  img.addEventListener("load", handleImageLoad)
}

const handleBack = () => {
  if ("startViewTransition" in document) {
    document.startViewTransition(() => {
      router.push('/')
    })
  } else {
    router.push('/')
  }
}

const toggleContent = () => {
  visibleContent.value = !visibleContent.value
}

const updateHtmlImgUrl = (html: string) => {
  // 匹配../..，替换为HOST
  const newHtml = html.replaceAll('../..', HOST)
  // 匹配图片地址，代理图片地址
  return newHtml.replace(/<img([^>]+)src="([^"]+)"/g, (_: string, attrs: string, src: string) => {
    return `<img${attrs}src="${getProxiedImageUrl(src)}"`
  })
}

const onPlay = () => {
  if (typeof route.params.id === "string") {
    play(route.params.id)
  }
}

const onResume = () => {
  resume()
}

const onPause = () => {
  pause()
}
</script>

<template>
  <div
    class="page"
    :style="{ backgroundColor: bgColor }"
  >
    <header class="header">
      <IconArrow
        class="icon"
        @click="handleBack"
      />
      <h1 class="title">
        {{ audio?.title }}
      </h1>
    </header>
    <main>
      <div
        v-if="audio?.img && !visibleContent"
        class="cover"
        :style="{
          backgroundImage: `url(${getProxiedImageUrl(audio.img)})`,
          'view-transition-name': `audio-${audio?.lessonNo}`
        }"
        @click="toggleContent"
      />
      <div
        v-if="audio?.html && visibleContent"
        class="content"
        v-html="updateHtmlImgUrl(audio?.html)"
        @click="toggleContent"
      />
    </main>
    <footer class="footer">
      <IconPrev class="icon-prev" />
      <button
        v-if="currentLessonNo !== audio?.lessonNo"
        class="btn"
        @click="onPlay"
      >
        <IconPlay class="icon" />
      </button>
      <button
        v-if="currentLessonNo === audio?.lessonNo && isPlaying"
        class="btn"
        @click="onPause"
      >
        <IconPause class="icon" />
      </button>
      <button
        v-if="currentLessonNo === audio?.lessonNo && !isPlaying"
        class="btn"
        @click="onResume"
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
