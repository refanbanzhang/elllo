<script setup>
import { ref } from 'vue'
import Button from '@/components/button/index.vue'
import Picker from '@/components/picker/index.vue'

const value = ref('')
const visible = ref(false)

const options = [
  { label: '选项1', value: 1 },
  { label: '选项2', value: 2 },
  { label: '选项3', value: 3 },
  { label: '选项4', value: 4 },
  { label: '选项5', value: 5 }
]
</script>

<template>
  <div class='m-picker-demo'>
    <h3>移动端选择器</h3>
    <Button @click='visible = true'> 打开选择器 </Button>
    <Picker
      :visible='visible'
      v-model='value'
      :options='options'
      title='请选择'
      @close="visible = false"
    />
    <div>选中值: {{ value }}</div>
  </div>
</template>