<script setup>
import { ref } from 'vue'
import Checkbox from '@/components/checkbox/index.vue'
import CheckboxGroup from '@/components/checkbox-group/index.vue'

const checked = ref(false)
const groupValue = ref([])

const options = [
  { label: '选项1', value: 1 },
  { label: '选项2', value: 2 },
  { label: '选项3', value: 3 }
]
</script>

<template>
  <div class='checkbox-demo'>
    <h3>单选框</h3>
    <Checkbox v-model='checked'>选项</Checkbox>
    <div>选中状态: {{ checked }}</div>

    <h3>复选框组</h3>
    <CheckboxGroup v-model='groupValue' :options='options' />
    <div>选中值: {{ groupValue }}</div>
  </div>
</template>