<script setup lang="ts">
type ButtonType = "primary" | "secondary" | "success" | "warning" | "danger"
type ButtonSize = "small" | "medium" | "large"

defineProps<{
  type?: ButtonType
  size?: ButtonSize
}>()
</script>

<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

<style lang="less" scoped>
.button {
  background: #fff;
  border: 1px solid #ccc;
  padding: 5px 10px;
  border-radius: 5px;
}
</style>
