<script setup lang="ts">
import { onMounted, onUnmounted } from "vue"
import useTransitionNavigate from "@/utils/transitionNavigate"
import usePlayer from "@/composables/use-player"
import useLessons from "@/composables/use-lessons"
import Player from "@/components/player/index.vue"
import ListItem from "./list-item/index.vue"

const { playingLesson, play } = usePlayer
const { lessons, loadNextPage } = useLessons
const { transitionNavigate } = useTransitionNavigate()

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
    <div class="list">
      <ListItem
        v-for="(lesson) in lessons"
        :key="lesson.url"
        :data="lesson"
        :class="lesson.lessonNo === playingLesson?.lessonNo ? 'active' : ''"
        @play="play(lesson)"
        @navigate="transitionNavigate(lesson.lessonNo)"
      />
    </div>
    <Player v-if="lessons.length > 0 && playingLesson" />
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
</style>
