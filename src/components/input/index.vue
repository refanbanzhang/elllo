<script setup lang="ts">
import { computed, inject } from "vue"

const props = defineProps<{
  modelValue?: string
}>()

const emit = defineEmits<{
  "update:modelValue": [value: string]
}>()

const formItem = inject("formItem", {
  modelValue: "",
  updateModelValue: () => {}
}) as {
  modelValue: string
  updateModelValue: (value: string) => void
}

// 这是错误的，这样派生出来的value将不具备响应式，input无法获得更新后的值
// const value = props.modelValue || formItem.modelValue

const value = computed(() => props.modelValue ?? formItem.modelValue)

const onInput = (e: Event) => {
  const newValue = (e.target as HTMLInputElement).value

  emit("update:modelValue", newValue)
  formItem.updateModelValue(newValue)
}
</script>

<template>
  <input
    :value="value"
    @input="onInput"
  >
</template>

<style lang="less" scoped>
</style>
