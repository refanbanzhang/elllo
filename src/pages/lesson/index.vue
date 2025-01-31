<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"
import type { Lesson } from "@/types"
import { getLessonByNo } from "@/api/audio"
import { updateHtmlImgUrl, getProxiedImageUrl } from "@/utils"
import { showLoading, hideLoading } from "@/components/toast"
import Player from "@/components/player/index.vue"
import PlayerIcon from "@/assets/play.svg"
import IconArrow from "@/assets/arrow-left.svg"
import usePlayer from "@/composables/use-player"
import { useRouter } from "vue-router"

const route = useRoute()
const router = useRouter()
const { play } = usePlayer
const lesson = ref<Lesson | null>(null)
const lessonNo = route.params.lessonNo as string

const onBack = () => {
  router.push("/")
}

onMounted(async () => {
  showLoading()
  lesson.value = await getLessonByNo(lessonNo)
  hideLoading()
})
</script>

<template>
  <div class="page" v-if="lesson">
    <IconArrow
      class="back"
      @click="onBack"
    />
    <div v-if="lesson.img" class="cover" :style="{
      backgroundImage: `url(${getProxiedImageUrl(lesson.img || '')})`,
    }" />
    <div class="info">
      <div class="info-title">
        {{ lesson.title }} - {{ lesson.lessonNo }}
      </div>
      <div class="player-icon-wrapper">
        <PlayerIcon
          class="player-icon"
          @click="play(lesson)"
        />
      </div>
    </div>
    <div class="content" v-html="updateHtmlImgUrl(lesson.html || '')" />
    <div class="player-wrapper">
      <Player />
    </div>
  </div>
</template>

<style lang='less' scoped>
.back {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1;
  width: 25px;
  height: 25px;
  fill: #fff;
}

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
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 0 15px;
  margin-bottom: 15px;
}

.info-title {
  flex: 1;
  font-size: 18px;
  font-weight: 600;
}

.player-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(0, 0, 0, .3);
}

.player-icon {
  width: 30px;
  height: 30px;
  color: #fff;
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
