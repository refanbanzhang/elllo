<script setup lang="ts">
import { ref } from "vue"
import Button from "@/components/button/index.vue"
import Slider from "@/components/slider/index.vue"
import Picker from "@/components/picker/index.vue"

type Option = {
  label: string
  value: number
}

const volumeValue = ref(30)
const pickerVisible = ref(false)

const options: Option[] =  [
  {
    label: '选项1',
    value: 1,
  },
  {
    label: '选项2',
    value: 2,
  },
  {
    label: '选项3',
    value: 3,
  },
]

const onPickerChange = (value: string) => {
  console.log(value)
}
</script>

<template>
  <div class="page">
    <h2>Picker</h2>
    <Button @click="pickerVisible = true">打开</Button>
    <Picker
      :visible="pickerVisible"
      :value="1"
      :options="options"
      @close="pickerVisible = false"
      @change="onPickerChange"
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
