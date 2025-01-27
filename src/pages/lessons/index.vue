<script setup lang="ts">
import { onMounted, onUnmounted } from "vue"
import { getProxiedImageUrl } from "@/utils"
import useTransitionNavigate from "@/utils/transitionNavigate"
import usePlayer from "@/composables/use-player"
import useLessons from "@/composables/use-lessons"
import Player from "@/components/player/index.vue"
import type { Lesson } from "@/types"

const { playingLesson, play } = usePlayer
const { lessons, loadNextPage } = useLessons
const { transitionNavigate } = useTransitionNavigate()

const onPlay = (lesson: Lesson) => {
  play(lesson)
}

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
  window.addEventListener("scroll", onScroll)
})

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll)
})
</script>

<template>
  <div class="page">
    <ul>
      <li v-for="(lesson) in lessons" :key="lesson.url"
        class="audio"
        :id="`audio-${lesson.lessonNo}`" @click="onPlay(lesson)">
        <img v-if="lesson.img" class="audio__image" :src="getProxiedImageUrl(lesson.img)" alt=""
          @click.stop="onNavigate(lesson.lessonNo)">
        <div class="audio__link" :href="lesson.url">
          {{ lesson.title }}
          <br />
          {{ lesson.lessonNo }}
        </div>
      </li>
    </ul>
    <Player v-if="playingLesson" />
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
