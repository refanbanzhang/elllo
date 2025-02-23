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
const isActive = ref(false)

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
  isActive.value = true
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
  isActive.value = false
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
      :class="{ 'is-active': isActive }"
      :style="{
        left: `calc(${modelValue}% - 10px)`
      }"
    />
  </div>
</template>

<style lang="less" scoped>
@height: 20px;
@transition-duration: 0.2s;

.slider {
  position: relative;
  background-color: rgba(0, 0, 0, 0.1);
  margin: 20px 0;
  border-radius: 2px;
  cursor: pointer;

  &:hover .slider-dot {
    transform: scale(1.1);
  }
}

.slider-dot {
  position: absolute;
  top: -10px + 2px;
  left: 0;
  width: @height;
  height: @height;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: all @transition-duration ease;

  &.is-active {
    transform: scale(1.2);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
  }
}
</style>
