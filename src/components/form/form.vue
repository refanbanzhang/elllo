<script setup lang="ts">
import { provide, reactive } from "vue"
import type { FormItemRule, FormItemInstance, FormInstance } from "./types"

const props = defineProps<{
  model: Record<string, string | number | boolean | string[] | number[] | boolean[]>
  rules?: FormItemRule
}>()

const formItems = reactive(new Set<FormItemInstance>())

// 提供给子组件的注册方法
provide("addFormItem", (item: FormItemInstance) => {
  formItems.add(item)
})

provide("removeFormItem", (item: FormItemInstance) => {
  formItems.delete(item)
})

// 提供表单数据和规则给子组件
provide("form", {
  model: props.model,
  rules: props.rules
})

const validate = async () => {
  const results = await Promise.all(
    Array.from(formItems).map((item) => item.validate())
  )

  return results.every((result) => result)
}

const resetFields = () => {
  formItems.forEach((item) => item.resetField())
}

const clearValidate = () => {
  formItems.forEach((item) => item.clearValidate())
}

// 暴露表单方法
defineExpose<FormInstance>({
  validate,
  resetFields,
  clearValidate
})
</script>

<template>
  <form @submit.prevent>
    <slot />
  </form>
</template>