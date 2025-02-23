<script setup lang="ts">
import { computed, ref } from "vue"

interface Props {
  modelValue: number
  max: number
  disabled: boolean
  size?: "small" | "default" | "large"
  allowHalf?: boolean
  spacing?: number
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 0,
  max: 5,
  disabled: false,
  size: "default",
  allowHalf: false,
  spacing: 4
})

const emit = defineEmits<{
  (e: "update:modelValue", value: number): void
}>()

const hoverValue = ref(0)

const starList = computed(() => {
  return Array.from({ length: props.max }, (_, index) => ({
    value: index + 1,
    active: index + 1 <= (hoverValue.value || props.modelValue)
  }))
})

const handleMouseEnter = (value: number) => {
  if (props.disabled) return
  hoverValue.value = value
}

const handleMouseLeave = () => {
  hoverValue.value = 0
}

const handleClick = (value: number) => {
  if (props.disabled) return
  emit("update:modelValue", value)
}

const sizeMap = {
  small: "16px",
  default: "20px",
  large: "24px"
} as const
</script>

<template>
  <div 
    class="rate"
    @mouseleave="handleMouseLeave"
  >
    <span
      v-for="item in starList"
      :key="item.value"
      class="rate-item"
      :class="{
        'is-active': item.active,
        'is-disabled': disabled
      }"
      :style="{
        fontSize: sizeMap[size],
        marginRight: `${spacing}px`
      }"
      @click="handleClick(item.value)"
      @mouseenter="handleMouseEnter(item.value)"
    >
      ★
    </span>
  </div>
</template>

<style scoped>
.rate {
  display: inline-flex;
  align-items: center;
}

.rate-item {
  cursor: pointer;
  color: #ddd;
  transition: all 0.3s;
  transform-origin: center;
}

.rate-item:hover {
  transform: scale(1.1);
}

.rate-item.is-active {
  color: #fadb14;
}

.rate-item.is-disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.rate-item:last-child {
  margin-right: 0 !important;
}
</style>