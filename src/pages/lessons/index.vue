<script setup lang="ts">
import { ref,onMounted, onUnmounted } from "vue"
import useLessons from "@/composables/use-lessons"
import Player from "@/components/player/index.vue"
import Tabs from "@/components/tabs/index.vue"
import ListItem from "./list-item/index.vue"
import type { Lesson as LessonType } from "@/types"
import playerStore from "@/stores/player"

const { playingLesson, isPlaying, play, pause } = playerStore
const { lessons, loadNextPage } = useLessons
const player = ref<InstanceType<typeof Player> | null>(null)

const open = (lesson: LessonType) => {
  player.value?.open(lesson)
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

const onKeydown = (event: KeyboardEvent) => {
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
  window.addEventListener("scroll", onScroll)
  window.addEventListener("keydown", onKeydown)
})

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll)
  window.removeEventListener("keydown", onKeydown)
})
</script>

<template>
  <div class="page">
    <div class="list">
      <ListItem
        :class="lesson.lessonNo === playingLesson?.lessonNo ? 'active' : ''"
        v-for="(lesson) in lessons"
        :key="lesson.url"
        :data="lesson"
        :isPlaying="isPlaying && playingLesson?.lessonNo === lesson.lessonNo"
        @open="open(lesson)"
        @play="play(lesson)"
      />
    </div>
    <div
      class="player-wrapper"
      v-if="lessons.length > 0 && playingLesson"
    >
      <Player ref="player" />
    </div>
    <div class="tabs-wrapper">
      <Tabs />
    </div>
  </div>
</template>

<style lang='less' scoped>
.page {
  min-height: 100vh;
  background: #000;
}

.list {
  padding: 15px;
  padding-bottom: 0;
}

.active :deep(.audio__content){
  color: #1ed760;
}

.player-wrapper {
  position: sticky;
  bottom: 60px;
  z-index: 1;
}

.tabs-wrapper {
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
