<script setup lang="ts">
import { ref } from "vue"
import ProgressBar from "@/components/progress-bar/index.vue"

type Props = {
  modelValue: number
}

withDefaults(defineProps<Props>(), {
  modelValue: 0,
})

const emit = defineEmits(["update:modelValue"])

const isDragging = ref(false)
const slider = ref<HTMLElement | null>(null)

const calculatePercentage = (event: TouchEvent) => {
  if (!slider.value) {
    return
  }

  const sliderRect = slider.value.getBoundingClientRect()
  const width = sliderRect.width
  const touchX = event.touches[0].clientX

  const percentage = (touchX / width) * 100
  const value = Math.min(Math.max(percentage, 0), 100)
  const roundedValue = Math.round(value)

  emit("update:modelValue", roundedValue)
}

const onTouchStart = (event: TouchEvent) => {
  isDragging.value = true
  calculatePercentage(event)
}

const onTouchMove = (event: TouchEvent) => {
  if (!isDragging.value) {
    return
  }

  calculatePercentage(event)
}

const onTouchEnd = () => {
  isDragging.value = false
}
</script>

<template>
  <div
    class="slider"
    ref="slider"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
  >
    <ProgressBar :value="modelValue" />
    <div
      class="slider-dot"
      :style="{
        left: `calc(${modelValue}% - 10px)`
      }"
     />
  </div>
</template>

<style lang="less" scoped>
@height: 20px;

.slider {
  position: relative;
  background-color: #000;
  margin: 20px 0;
}

.slider-dot {
  position: absolute;
  // 2px为progress-bar高度的一半
  top: -10px + 2px;
  left: 0;
  width: @height;
  height: @height;
  border-radius: 50%;
  background-color: #fff;
}
</style>
