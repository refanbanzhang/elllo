<script setup lang="ts">
import { computed } from "vue"
import Spinner from "@/components/spinner/index.vue"

type ButtonType = "primary" | "secondary" | "success" | "warning" | "danger"
type ButtonSize = "small" | "medium" | "large"

const props = withDefaults(defineProps<{
  type?: ButtonType
  size?: ButtonSize
  loading?: boolean
  disabled?: boolean
}>(), {
  type: "primary",
  size: "medium",
  loading: false,
  disabled: false
})

const buttonClass = computed(() => [
  props.type,
  props.size,
  {
    loading: props.loading,
    disabled: props.disabled
  }])
</script>

<template>
  <button :class="buttonClass">
    <Spinner v-if="loading" />
    <slot></slot>
  </button>
</template>

<style lang="less" scoped>
.loading,
.disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.primary {
  background: #007bff;
  color: #fff;
}

.secondary {
  background: #6c757d;
  color: #fff;
}

.success {
  background: #28a745;
  color: #fff;
}

.warning {
  background: #ffc107;
  color: #fff;
}

.danger {
  background: #dc3545;
  color: #fff;
}

.small {
  padding: 3px 6px;
  font-size: 12px;
}

.medium {
  padding: 5px 10px;
  font-size: 14px;
}

.large {
  padding: 10px 20px;
  font-size: 16px;
}
</style>
