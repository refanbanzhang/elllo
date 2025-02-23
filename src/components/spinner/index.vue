<script setup lang="ts">
interface Props {
  size?: number // 尺寸大小
  color?: string // 颜色
  borderWidth?: number // 边框宽度
}

const props = withDefaults(defineProps<Props>(), {
  size: 14,
  color: "#fff", 
  borderWidth: 2
})
</script>

<template>
  <div 
    class="spinner"
    :style="{
      width: `${props.size}px`,
      height: `${props.size}px`
    }"
  >
    <div 
      class="spinner-inner"
      :style="{
        borderWidth: `${props.borderWidth}px`,
        borderColor: props.color,
        borderRightColor: 'transparent'
      }"
    />
  </div>
</template>

<style lang="less" scoped>
.spinner {
  display: inline-block;
  position: relative;

  .spinner-inner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-style: solid;
    border-radius: 50%;
    animation: spin 0.8s cubic-bezier(0.4, 0.0, 0.2, 1) infinite;
  }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
