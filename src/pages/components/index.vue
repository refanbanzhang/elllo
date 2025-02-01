<script setup lang="ts">
import { ref } from "vue"
import Button from "@/components/button/index.vue"
import Slider from "@/components/slider/index.vue"
import Picker from "@/components/picker/index.vue"

const volumeValue = ref(30)
const pickerVisible = ref(false)
</script>

<template>
  <div class="page">
    <h2>Picker</h2>
    <Button @click="pickerVisible = true">打开</Button>
    <Picker
      :visible="pickerVisible"
      :options="['选项1', '选项2', '选项3']"
      @change="pickerVisible = false"
    />

    <h2>Slider</h2>
    volumeValue: {{ volumeValue }}
    <Slider
      :value="volumeValue"
      @change="volumeValue = $event"
    />

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
