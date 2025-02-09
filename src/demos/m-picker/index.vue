<script setup>
import { ref } from 'vue'
import MPicker from '@/components/m-picker/index.vue'

const value = ref('')

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
    <MPicker
      v-model='value'
      :options='options'
      title='请选择'
    />
    <div>选中值: {{ value }}</div>
  </div>
</template>