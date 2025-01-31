<script setup lang="ts">
interface Props {
  value: number
  color?: string
  trackColor?: string
}

withDefaults(defineProps<Props>(), {
  color: "#1ed760",
  trackColor: "rgba(255, 255, 255, 0.3)",
})
</script>

<template>
  <div
    class="progress-bar"
    :style="{ backgroundColor: trackColor }"
  >
    <div
      class="progress-bar__filled"
      :style="{ width: `${value}%`, backgroundColor: color }"
    />
  </div>
</template>

<style lang="less" scoped>
.progress-bar {
  width: 100%;
  height: 4px;
  background-color: rgba(255, 255, 255, 0.3);
  cursor: pointer;
  position: relative;
}

.progress-bar__filled {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background-color: #fff;
  transition: width 0.1s linear;
}
</style>
