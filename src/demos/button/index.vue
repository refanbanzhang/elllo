<template>
  <div class='button-demo'>
    <Button>默认按钮</Button>
    <Button type='primary'>主要按钮</Button>
    <Button type='success'>成功按钮</Button>
    <Button type='warning'>警告按钮</Button>
    <Button type='danger'>危险按钮</Button>
    <Button type='info'>信息按钮</Button>
  </div>
</template>

<script setup>
import Button from '@/components/button/index.vue'
</script>

<style scoped>
.button-demo {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
