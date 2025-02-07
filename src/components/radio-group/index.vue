<script setup>
import Radio from '../radio/index.vue'

const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean],
    default: ''
  },
  options: {
    type: Array,
    default: () => []
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="radio-group">
    <template v-for="item in options" :key="item.value">
      <Radio
        :model-value="modelValue === item.value"
        :disabled="disabled"
        @update:model-value="(val) => emit('update:modelValue', item.value)"
      >
        {{ item.label }}
      </Radio>
    </template>
  </div>
</template>

<style scoped>
.radio-group {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
</style>