<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"
import type { Lesson } from "@/types"
import { getLessonByNo } from "@/api/audio"
import { updateHtmlImgUrl, getProxiedImageUrl } from "@/utils"
import { showLoading, hideLoading } from "@/components/toast"
import Player from "@/components/player/index.vue"

const route = useRoute()
const lessonNo = route.params.lessonNo as string

const lesson = ref<Lesson | null>(null)

onMounted(async () => {
  showLoading()
  lesson.value = await getLessonByNo(lessonNo)
  hideLoading()
})
</script>

<template>
  <div class="page">
    <div v-if="lesson?.img" class="cover" :style="{
      backgroundImage: `url(${getProxiedImageUrl(lesson?.img || '')})`,
    }" />
    <div class="info">
      {{ lesson?.title }} - {{ lessonNo }}
    </div>
    <div class="content" v-html="updateHtmlImgUrl(lesson?.html || '')" />
    <div class="player-wrapper">
      <Player />
    </div>
  </div>
</template>

<style lang='less' scoped>
.cover {
  margin-bottom: 20px;
  width: 100%;
  padding-top: calc(60 / 90 * 100%);
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  filter: drop-shadow(0 0 1px rgba(0, 0, 0, .3)) drop-shadow(0 0 10px rgba(0, 0, 0, .3));
}

.info {
  padding: 0 15px;
  margin-bottom: 15px;
}

.content {
  padding: 15px;
  :deep(p) {
    margin-bottom: 15px;
  }
}

:deep(img) {
  display: block;
  margin-top: 5px;
  margin-bottom: 5px;
}

.player-wrapper {
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
