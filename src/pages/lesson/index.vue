<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router"
import { HOST } from "@/constant"
import { getAverageColor, getProxiedImageUrl } from "@/utils"
import audios from "../../../audios.json"

const route = useRoute()
const router = useRouter()

const audio = audios.find((item) => item.lessonNo === route.params.id)
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
  document.startViewTransition(() => {
    router.push('/')
  })
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
      <svg viewBox="0 0 24 24" class="prev"><path d="M6.3 3a.7.7 0 0 1 .7.7v6.805l11.95-6.899a.7.7 0 0 1 1.05.606v15.576a.7.7 0 0 1-1.05.606L7 13.495V20.3a.7.7 0 0 1-.7.7H4.7a.7.7 0 0 1-.7-.7V3.7a.7.7 0 0 1 .7-.7h1.6z"></path></svg>
      <div class="play-btn-wrapper">
        <svg class="play-btn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z">
          </path>
        </svg>
      </div>
      <svg  viewBox="0 0 24 24" class="next"><path d="M17.7 3a.7.7 0 0 0-.7.7v6.805L5.05 3.606A.7.7 0 0 0 4 4.212v15.576a.7.7 0 0 0 1.05.606L17 13.495V20.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-1.6z"></path></svg>
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
