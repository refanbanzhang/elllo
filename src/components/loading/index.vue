<script setup lang="ts">
defineProps<{
  text?: string
}>()
</script>

<template>
  <div class="loading">
    <div class="loading__mask">
      <div class="loading__content">
        <div class="loading__text">
          {{ text || "loading..." }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.loading {
  position: fixed;
  inset: 0;

  &__mask {
    background: rgba(0, 0, 0, .7);
    width: 100%;
    height: 100%;
  }

  &__content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border-radius: 10px;
    background: #fff;
  }
}
</style>
