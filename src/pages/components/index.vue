<script setup lang="ts">
import { ref } from "vue"
import Button from "@/components/button/index.vue"
import Slider from "@/components/slider/index.vue"

const value = ref(30)
</script>

<template>
  <div class="page">
    <h2>Slider</h2>
    value: {{ value }}
    <Slider v-model="value" />

    <h2>Button</h2>
    type:
    <Button type="primary">按钮</Button>
    <Button type="secondary">按钮</Button>
    <Button type="success">按钮</Button>
    <Button type="warning">按钮</Button>
    <Button type="danger">按钮</Button>
    <br>
    size:
    <Button type="primary" size="small">按钮</Button>
    <Button type="secondary" size="medium">按钮</Button>
    <Button type="success" size="large">按钮</Button>
    <br>
    loading:
    <Button type="primary" loading>按钮</Button>
    <br>
    icon:
    <Button type="primary">
      icon
      按钮
    </Button>
    <br>
    disabled:
    <Button type="primary" disabled>按钮</Button>
  </div>
</template>

<style lang="less" scoped>
.page {
  padding: 20px;
}
</style>
