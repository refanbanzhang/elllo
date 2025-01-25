<script setup lang="ts">
import { onMounted } from "vue"
import { useRouter } from "vue-router"
import { getProxiedImageUrl } from "@/utils"
import audioPlayer from "@/composables/use-audio-player"
import Player from "@/components/player/index.vue"

const router = useRouter()
const { audios, play, currentLessonNo, setCurrentLessonNo, loadNextPage } = audioPlayer

const restoreLastScrollPosition = () => {
  const audioElement = document.getElementById(`audio-${currentLessonNo.value}`)
  const paddingTop = 15
  if (audioElement) {
    window.scrollTo({
      top: audioElement.offsetTop - paddingTop - window.innerHeight / 2,
      behavior: "instant"
    })
  }
}

const restoreLastLesson = () => {
  const lastPlayedLessonNo = localStorage.getItem("lastPlayedLessonNo")
  if (lastPlayedLessonNo) {
    setCurrentLessonNo(lastPlayedLessonNo)
  }
}

const onNavigate = (index: number) => {
  if ("startViewTransition" in document) {
    document.startViewTransition(() => {
      router.push(`/elllo/${audios.value[index].lessonNo}`)
    })
  } else {
    router.push(`/elllo/${audios.value[index].lessonNo}`)
  }
}

const onScroll = () => {
  const scrollPosition = window.scrollY
  const scrollHeight = document.documentElement.scrollHeight
  const clientHeight = document.documentElement.clientHeight
  const isBottom = scrollHeight - scrollPosition - clientHeight < 1
  if (isBottom) {
    loadNextPage()
  }
}

onMounted(() => {
  restoreLastLesson()

  // 需要等 audios 加载完成，否则获取不到目标元素
  restoreLastScrollPosition()
})

onMounted(() => {
  window.addEventListener("scroll", onScroll)
})
</script>

<template>
  <div class="page">
    <ul>
      <li
        :class="['audio', currentLessonNo === item.lessonNo ? 'audio--active' : '']"
        v-for="(item, index) in audios"
        :id="`audio-${item.lessonNo}`"
        :key="item.url"
        @click="play(item.lessonNo)"
      >
        <img
          v-if="item.img"
          class="audio__image"
          :src="getProxiedImageUrl(item.img)"
          alt=""
          @click.stop="onNavigate(index)"
        >
        <div
          class="audio__link"
          :href="item.url"
        >
          {{ item.title }}
          <br />
          {{ item.lessonNo }}
        </div>
      </li>
    </ul>
    <Player />
  </div>
</template>

<style lang='less' scoped>
.page {
  background: #000;
}

ul {
  padding: 15px;
  padding-bottom: 0;
}

.audio {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 15px;
  border-radius: 6px;

  &:last-child {
    margin-bottom: 0;
  }

  &__image {
    flex-shrink: 0;
    width: 60px;
    height: 60px;
    margin-right: 10px;
    border-radius: 3px;
    object-fit: cover;
  }

  &__link {
    flex: 1;
    margin-right: 10px;
    color: #fff;
  }

  &--active .audio__link {
    color: #1ed760;
  }
}

</style>
