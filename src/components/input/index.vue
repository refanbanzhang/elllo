<script setup lang="ts">
import { computed, inject } from "vue"

interface FormItem {
  modelValue: string
  updateModelValue: (value: string) => void
}

const props = defineProps<{
  modelValue?: string
  placeholder?: string
  disabled?: boolean
}>()

const emit = defineEmits<{
  "update:modelValue": [value: string]
}>()

const formItem = inject("formItem", {
  modelValue: "",
  updateModelValue: () => {}
}) as FormItem

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
    :placeholder="placeholder"
    :disabled="disabled"
    class="input"
    @input="onInput"
  >
</template>

<style lang="less" scoped>
.input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 14px;
  line-height: 1.5;
  outline: none;
  transition: all 0.3s;

  &::placeholder {
    color: #c0c4cc;
  }

  &:hover {
    border-color: #c0c4cc;
  }

  &:focus {
    border-color: #409eff;
  }

  &:disabled {
    background-color: #f5f7fa;
    border-color: #e4e7ed;
    color: #c0c4cc;
    cursor: not-allowed;
  }
}
</style>
