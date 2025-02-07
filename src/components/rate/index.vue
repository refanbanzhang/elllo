<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 5
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const starList = computed(() => {
  return Array.from({ length: props.max }, (_, index) => ({
    value: index + 1,
    active: index + 1 <= props.modelValue
  }))
})

const handleClick = (value) => {
  if (props.disabled) return
  emit('update:modelValue', value)
}
</script>

<template>
  <div class="rate">
    <span
      v-for="item in starList"
      :key="item.value"
      class="rate-item"
      :class="{
        'is-active': item.active,
        'is-disabled': disabled
      }"
      @click="handleClick(item.value)"
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
  font-size: 20px;
  color: #ddd;
  transition: color 0.2s;
}

.rate-item.is-active {
  color: #fadb14;
}

.rate-item.is-disabled {
  cursor: not-allowed;
}
</style>