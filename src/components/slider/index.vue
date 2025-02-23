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

const calculatePercentage = (event: TouchEvent | MouseEvent) => {
  if (!slider.value) {
    return
  }

  const sliderRect = slider.value.getBoundingClientRect()
  const width = sliderRect.width
  const offsetLeft = slider.value.offsetLeft

  // 根据事件类型获取不同的clientX
  const clientX = event instanceof TouchEvent
    ? event.touches[0].clientX
    : event.clientX
  const touchX = clientX - offsetLeft

  const percentage = (touchX / width) * 100
  const value = Math.min(Math.max(percentage, 0), 100)
  const roundedValue = Math.round(value)

  emit("update:modelValue", roundedValue)
}

const handleStart = (event: TouchEvent | MouseEvent) => {
  isDragging.value = true
  isActive.value = true
  calculatePercentage(event)

  // 添加全局事件监听
  // 为什么不在元素上监听呢？
  // 因为元素上监听的话，当用户在元素上按下后，拖动到元素外，无法触发元素上的mouseup事件
  if (event instanceof MouseEvent) {
    document.addEventListener("mousemove", handleMove)
    document.addEventListener("mouseup", handleEnd)
  }
}

const handleMove = (event: TouchEvent | MouseEvent) => {
  if (isDragging.value) {
    calculatePercentage(event)
  }
}

const handleEnd = () => {
  isDragging.value = false
  isActive.value = false

  // 移除全局事件监听
  document.removeEventListener("mousemove", handleMove)
  document.removeEventListener("mouseup", handleEnd)
}
</script>

<template>
  <div
    class="slider"
    ref="slider"
    @touchstart="handleStart"
    @touchmove="handleMove"
    @touchend="handleEnd"
    @mousedown="handleStart"
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
