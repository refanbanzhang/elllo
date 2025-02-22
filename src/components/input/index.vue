<script setup lang="ts">
import { inject } from "vue"

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

const value = props.modelValue || formItem.modelValue

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
