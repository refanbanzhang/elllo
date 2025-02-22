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
  updateValue: () => {}
}) as {
  modelValue: string
  updateValue: (value: string) => void
}

const value = computed({
  get: () => props.modelValue || formItem.modelValue,
  set: (newValue: string) => {
    emit("update:modelValue", newValue)
    formItem.updateValue(newValue)
  }
})

const onInput = (e: Event) => {
  value.value = (e.target as HTMLInputElement).value
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
