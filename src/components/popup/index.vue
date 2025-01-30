<script setup lang="ts">
defineProps<{
  visible: boolean
}>()
</script>

<template>
  <div
    class="popup"
    v-if="visible"
  >
    <slot />
  </div>
</template>

<style lang="less" scoped>
.popup {
  position: fixed;
  inset: 0;
}
</style>
