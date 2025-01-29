<script setup lang="ts">
import type { Component } from "vue"

type ToastOptions = {
  text?: string
  icon?: Component
}

defineProps<ToastOptions>()
</script>

<template>
  <div class="toast">
    <div class="toast__mask">
      <div class="toast__content">
        <component v-if="icon" :is="icon" />
        <div v-if="text" class="toast__text">{{ text }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.toast {
  position: fixed;
  inset: 0;

  &__content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border-radius: 5px;
    color: #fff;
    font-size: 12px;
    background: rgba(0, 0, 0, .7);
    gap: 10px 0;
  }
}
</style>
