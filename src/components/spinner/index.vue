<script setup lang="ts">
</script>

<template>
  <div class="spinner">
    <div class="spinner-inner" />
  </div>
</template>

<style lang="less" scoped>
.spinner {
  display: inline-block;
  width: 14px;
  height: 14px;

  .spinner-inner {
    width: 100%;
    height: 100%;
    border: 2px solid #fff;
    border-radius: 50%;
    border-right-color: transparent;
    animation: spin 1s linear infinite;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
