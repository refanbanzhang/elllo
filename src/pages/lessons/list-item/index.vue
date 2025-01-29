<script setup lang="ts">
import type { Lesson } from "@/types"
import { getProxiedImageUrl } from "@/utils"
import usePlayer from "@/composables/use-player"
import IconPlay from "@/assets/play.svg"
import IconPause from "@/assets/pause.svg"

defineProps<{
  data: Lesson
}>()

defineEmits(["play", "open"])

const { isPlaying, playingLesson } = usePlayer;
</script>

<template>
  <div
    class="audio"
    @click="$emit('play')"
  >
    <img
      v-if="data.img"
      class="audio__image"
      :src="getProxiedImageUrl(data.img)"
      @click.stop="$emit('open')"
      alt=""
    >
    <div class="audio__content">
      {{ data.title }}
      <br />
      {{ data.lessonNo }}
    </div>
    <div>
      <IconPause v-if="isPlaying && playingLesson?.lessonNo === data.lessonNo" class="icon audio__pause" />
      <IconPlay v-else class="icon" />
    </div>
  </div>
</template>

<style lang='less' scoped>
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

  &__content {
    flex: 1;
    margin-right: 10px;
    color: #fff;
  }
}

.icon {
  color: #fff;
  width: 20px;
  height: 20px;
}

.audio__pause {
  color: #1ed760;
}
</style>
