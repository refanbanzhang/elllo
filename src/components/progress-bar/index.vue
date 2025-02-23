<script setup lang="ts">
interface Props {
  value: number
  color?: string
  trackColor?: string
  duration?: number
  hoverable?: boolean
}

withDefaults(defineProps<Props>(), {
  color: "#1ed760",
  trackColor: "rgba(255, 255, 255, 0.3)",
  duration: 0.3,
  hoverable: true
})
</script>

<template>
  <div
    class="progress-bar"
    :class="{ 'progress-bar--hoverable': hoverable }"
    :style="{
      backgroundColor: trackColor,
      '--duration': `${duration}s`,
      '--bar-color': color
    }"
  >
    <div
      class="progress-bar__filled"
      :style="{ width: `${value}%` }"
    />
  </div>
</template>

<style lang="less" scoped>
.progress-bar {
  width: 100%;
  height: 4px;
  cursor: pointer;
  position: relative;
  border-radius: 2px;
  overflow: hidden;
  transition: height var(--duration) ease;

  &--hoverable:hover {
    height: 6px;
  }
}

.progress-bar__filled {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background-color: var(--bar-color);
  transition: width var(--duration) ease;
  border-radius: 2px;
}
</style>
