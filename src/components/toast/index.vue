<script setup lang="ts">
import type { Component } from "vue"

type ToastOptions = {
  text?: string
  icon?: Component
  duration?: number  // 显示持续时间
  position?: "top" | "center" | "bottom" // 显示位置
}

defineProps<ToastOptions>()
</script>

<template>
  <div class="toast">
    <div class="toast__mask">
      <div class="toast__content">
        <component
          v-if="icon"
          :is="icon"
          class="toast__icon"
        />
        <div
          v-if="text"
          class="toast__text"
        >
          {{ text }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.toast {
  position: fixed;
  inset: 0;
  pointer-events: none; // 允许点击穿透
  z-index: 9999;

  &__mask {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__content {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 80%;
    padding: 16px 24px;
    border-radius: 8px;
    color: #fff;
    font-size: 14px;
    background: rgba(0, 0, 0, 0.75);
    backdrop-filter: blur(2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    gap: 8px;
  }

  &__icon {
    font-size: 24px;
  }

  &__text {
    text-align: center;
    word-break: break-word;
    line-height: 1.5;
  }
}
</style>
