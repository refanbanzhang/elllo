<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router"
import { HOST } from "@/constant"
import { getAverageColor, getProxiedImageUrl } from "@/utils"
import useAudioPlayer from "@/composables/use-audio-player"

import IconPrev from "@/assets/prev.svg"
import IconNext from "@/assets/next.svg"
import IconPlay from "@/assets/play.svg"
import IconPause from "@/assets/pause.svg"

const route = useRoute()
const router = useRouter()
const { play, currentIndex, audios, setCurrentIndex, isPlaying, pause, resume } = useAudioPlayer()
const audio = audios.value.find((item) => item.lessonNo === route.params.id)
const bgColor = ref("#f7f7f8")
const visibleContent = ref(false)

// TODO: 当前视频的currentIndex是多少呢？

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
  console.log(route.params.id)
  // 读取目标音频标识
  // 暂停正在播放的音频
  // 将目标音频标识更新到currentLesson
  // 播放当前音频

  if (isPlaying.value) {
    pause()
  } else {
    resume()
  }
}
</script>

<template>
  <div class="page" :style="{ backgroundColor: bgColor }">
    <header>
      <svg viewBox="0 0 24 24" class="icon" @click="handleBack">
        <path d="M2.793 8.043a1 1 0 0 1 1.414 0L12 15.836l7.793-7.793a1 1 0 1 1 1.414 1.414L12 18.664 2.793 9.457a1 1 0 0 1 0-1.414z"></path>
      </svg>
      <h1 class="title">
        {{ audio?.title }}
      </h1>
    </header>
    <main>
      <div
        v-if="audio?.img && !visibleContent" class="cover"
        @click="toggleContent"
        :style="{
          backgroundImage: `url(${getProxiedImageUrl(audio.img)})`,
          'view-transition-name': `audio-${audio?.lessonNo}`
        }" />
      <div v-if="audio?.html && visibleContent" class="content" v-html="updateHtmlImgUrl(audio?.html)" @click="toggleContent" />
    </main>
    <footer>
      <IconPrev class="prev" />
      <!-- 如果当前详情是正在播放的那个视频，则同步按钮状态 -->
      <!-- 否则，同步按钮状态 -->
      <div class="play-btn-wrapper" @click="onPlay" v-if="!isPlaying">
        <IconPlay class="play-btn" />
      </div>
      <div class="play-btn-wrapper" @click="onPlay" v-if="isPlaying">
        <IconPause class="play-btn pause-btn" />
      </div>
      <IconNext class="next" />
    </footer>
  </div>
</template>

<style lang="less" scoped>
.page {
  display: flex;
  flex-direction: column;
  padding: 15px;
  height: 100vh;
  color: #fff;
  background-image: linear-gradient(rgba(0, 0, 0, .2), rgba(0, 0, 0, .6) 80%);
}

header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
}

.icon {
  width: 24px;
  height: 24px;
  fill: currentColor;
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

footer {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
}

.play-btn-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 35px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: white;
}

.play-btn {
  width: 25px;
  height: 25px;
  color: #000;
}

.prev,
.next {
  width: 32px;
  height: 32px;
  color: #fff;
  fill: currentColor;
}
</style>
