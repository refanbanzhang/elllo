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
  "button-base",
  props.type,
  props.size,
  {
    loading: props.loading,
    disabled: props.disabled
  }
])
</script>

<template>
  <button
    :class="buttonClass"
    :disabled="disabled || loading"
  >
    <Spinner
      class="icon"
      v-if="loading"
    />
    <span class="button-content">
      <slot />
    </span>
  </button>
</template>

<style lang="less" scoped>
.button-base {
  border: none;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  &:not(:disabled):hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  &:not(:disabled):active {
    transform: translateY(0);
  }
}

.button-content {
  display: inline-flex;
  align-items: center;
}

.loading,
.disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

.icon {
  margin-right: 8px;
}

.primary {
  background: linear-gradient(145deg, #0088ff, #0066ff);
  color: #fff;

  &:not(:disabled):hover {
    background: linear-gradient(145deg, #0066ff, #0052ff);
  }
}

.secondary {
  background: linear-gradient(145deg, #7a8288, #5a6268);
  color: #fff;

  &:not(:disabled):hover {
    background: linear-gradient(145deg, #5a6268, #4a5258);
  }
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
  padding: 6px 12px;
  font-size: 13px;
  min-height: 32px;
}

.medium {
  padding: 8px 16px;
  font-size: 14px;
  min-height: 38px;
}

.large {
  padding: 12px 24px;
  font-size: 16px;
  min-height: 44px;
}
</style>
