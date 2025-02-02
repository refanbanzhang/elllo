<script setup lang="ts">
import type { Lesson } from "@/types"
import IconPlay from "@/assets/play.svg"
import IconPause from "@/assets/pause.svg"
import { getProxiedImageUrl } from "@/utils"

defineProps<{
  data: Lesson
  isPlaying: boolean
}>()

defineEmits(["play", "open"])
</script>

<template>
  <div
    class="audio"
    @click.stop="$emit('open')"
  >
    <img
      class="audio__image"
      v-if="data.img"
      :src="getProxiedImageUrl(data.img)"
      alt=""
    >
    <div class="audio__content">
      {{ data.title }}
      <br />
      {{ data.lessonNo }}
    </div>
    <div @click.stop="$emit('play')">
      <IconPause
        class="icon audio__pause"
        v-if="isPlaying"
      />
      <IconPlay
        class="icon"
        v-else
      />
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
