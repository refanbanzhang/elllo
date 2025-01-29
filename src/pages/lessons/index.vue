<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue"
import usePlayer from "@/composables/use-player"
import useLessons from "@/composables/use-lessons"
import Player from "@/components/player/index.vue"
import Tabs from "@/components/tabs/index.vue"
import ListItem from "./list-item/index.vue"
import Lesson from "@/components/lesson/index.vue"
import type { Lesson as LessonType } from "@/types"
import usePageLocker from "@/composables/use-page-locker"
import popup from "@/components/popup/index.vue"

const { playingLesson, isPlaying, play, pause } = usePlayer
const { lessons, loadNextPage } = useLessons
const { lockPage, unlockPage } = usePageLocker()

const visible = ref(false)
const currentLesson = ref<LessonType | null>(null)

const onUpdateLesson = (lesson: LessonType) => {
  currentLesson.value = lesson
}

const onOpenPopup = (lesson: LessonType) => {
  currentLesson.value = lesson
  visible.value = true
  lockPage()
}

const onClose = () => {
  visible.value = false
  unlockPage()
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
  window.addEventListener("keydown", onKeydown)
})

onUnmounted(() => {
  window.removeEventListener("keydown", onKeydown)
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
        @open="onOpenPopup(lesson)"
      />
    </div>
    <div v-if="lessons.length > 0 && playingLesson"  class="player-wrapper">
      <Player @open="onOpenPopup(playingLesson)" />
    </div>
    <div class="tabs-wrapper">
      <Tabs />
    </div>
    <popup
      :visible="visible"
      @close="onClose"
    >
      <Lesson
        v-if="currentLesson"
        :data="currentLesson"
        @update="onUpdateLesson"
        @close="onClose"
      />
    </popup>
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
}

.tabs-wrapper {
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
}

.popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
}
</style>
