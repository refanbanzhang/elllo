<script setup lang="ts">
defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  "update:modelValue": [value: string]
}>()
</script>

<template>
  <input
    :value="modelValue"
    @input="(e) => emit('update:modelValue', (e.target as HTMLInputElement).value)"
  />
</template>

<style lang="less" scoped>
</style>
