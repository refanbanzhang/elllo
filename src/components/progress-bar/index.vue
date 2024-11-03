<script setup lang="ts">

interface Props {
  modelValue: number
}

defineProps<Props>()

</script>

<template>
  <div
    class="progress-bar"
  >
    <div
      class="progress-bar__filled"
      :style="{ width: `${modelValue}%` }"
    />
  </div>
</template>

<style scoped>
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
