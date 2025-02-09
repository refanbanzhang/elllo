<script setup>
import { ref } from 'vue'
import Radio from '@/components/radio/index.vue'
import RadioGroup from '@/components/radio-group/index.vue'

const value = ref('')

const options = [
  { label: '选项1', value: 1 },
  { label: '选项2', value: 2 },
  { label: '选项3', value: 3 }
]
</script>

<template>
  <div class='radio-demo'>
    <h3>单选框组</h3>
    <RadioGroup v-model='value' :options='options' />
    <div>选中值: {{ value }}</div>
  </div>
</template>