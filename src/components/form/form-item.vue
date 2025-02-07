<script setup lang="ts">
import { computed, inject, onMounted, onUnmounted, ref } from "vue"
import type { FormItemInstance } from "./types"

const props = defineProps<{
  prop?: string
  label?: string
}>()

const errorMessage = ref("")
const isValidating = ref(false)

const form = inject("form") as {
  model: Record<string, any>
  rules?: Record<string, any>
}
const addFormItem = inject("addFormItem") as (item: FormItemInstance) => void
const removeFormItem = inject("removeFormItem") as (item: FormItemInstance) => void

const fieldValue = computed(() => {
  return props.prop ? form.model[props.prop] : undefined
})

const getRules = () => {
  if (!props.prop || !form.rules) return []
  return form.rules[props.prop] || []
}

const isEmpty = (value: any) => {
  if (value === null || value === undefined) {
    return true
  }

  if (typeof value === 'string' && value.trim() === '') {
    return true
  }

  if (Array.isArray(value) && value.length === 0) {
    return true
  }

  if (value instanceof Object && Object.keys(value).length === 0) {
    return true
  }

  return false
}

const validate = async () => {
  if (!props.prop) return true

  const rules = getRules()
  if (!rules.length) return true

  isValidating.value = true
  errorMessage.value = ""

  try {
    for (const rule of rules) {
      if (rule.required && isEmpty(fieldValue.value)) {
        errorMessage.value = rule.message || "此字段是必填的"
        return false
      }

      if (rule.validator) {
        const valid = await rule.validator(fieldValue.value)
        if (!valid) {
          errorMessage.value = rule.message || "验证失败"
          return false
        }
      }
    }
    return true
  } finally {
    isValidating.value = false
  }
}

const resetField = () => {
  if (props.prop) {
    form.model[props.prop] = ""
  }
  clearValidate()
}

const clearValidate = () => {
  errorMessage.value = ""
}

const onBlur = async () => {
  if (props.prop) {
    await validate()
  }
}

const formItemMethods: FormItemInstance = {
  validate,
  resetField,
  clearValidate
}

onMounted(() => {
  addFormItem(formItemMethods)
})

onUnmounted(() => {
  removeFormItem(formItemMethods)
})
</script>

<template>
  <div class="form-item">
    <label v-if="label" class="form-label">{{ label }}</label>
    <div
      class="form-content"
      @blur.capture="onBlur"
    >
      <slot  />
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-item {
  margin-bottom: 1rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.error-message {
  color: #dc2626;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
</style>