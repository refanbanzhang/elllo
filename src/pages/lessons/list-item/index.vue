<script setup lang="ts">
import type { Lesson } from "@/types"
import { getProxiedImageUrl } from "@/utils"

defineProps<{
  data: Lesson
}>()

defineEmits(["play", "navigate"])
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
      @click.stop="$emit('navigate')"
      alt=""
    >
    <div class="audio__content">
      {{ data.title }}
      <br />
      {{ data.lessonNo }}
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
</style>
