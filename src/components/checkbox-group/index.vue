<script setup>
import { provide, computed } from 'vue'
import Checkbox from '../checkbox/index.vue'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
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

const onChange = (checked, value) => {
  const newValue = [...props.modelValue]

  if (checked) {
    newValue.push(value)
  } else {
    const index = newValue.indexOf(value)
    newValue.splice(index, 1)
  }

  emit('update:modelValue', newValue)
}
</script>

<template>
  <div class="checkbox-group">
    <template v-for="item in options" :key="item.value">
      <Checkbox
        :model-value="modelValue.includes(item.value)"
        :disabled="disabled"
        @update:model-value="(checked) => onChange(checked, item.value)"
      >
        {{ item.label }}
      </Checkbox>
    </template>
  </div>
</template>

<style scoped>
.checkbox-group {
  display: flex;
  gap: 12px;
}
</style>