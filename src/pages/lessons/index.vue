<script setup lang="ts">
import { onMounted, onUnmounted } from "vue"
import { getProxiedImageUrl } from "@/utils"
import audioPlayer from "@/composables/use-audio-player"
import Player from "@/components/player/index.vue"
import useTransitionNavigate from "@/utils/transitionNavigate"
import useAudios from "@/composables/use-audios"
const { play, activeLesson } = audioPlayer

const { audios, loadNextPage } = useAudios()
const { transitionNavigate } = useTransitionNavigate()

const onNavigate = (lessonNo: string) => {
  transitionNavigate(lessonNo)
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
  loadNextPage()
})

onMounted(() => {
  window.addEventListener("scroll", onScroll)
})

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll)
})
</script>

<template>
  <div class="page">
    <ul>
      <li
        :class="['audio', activeLesson?.lessonNo === item.lessonNo ? 'audio--active' : '']"
        v-for="(item) in audios"
        :id="`audio-${item.lessonNo}`"
        :key="item.url"
        @click="play(item)"
      >
        <img
          v-if="item.img"
          class="audio__image"
          :src="getProxiedImageUrl(item.img)"
          alt=""
          @click.stop="onNavigate(item.lessonNo)"
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
