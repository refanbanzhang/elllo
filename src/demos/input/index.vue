<script setup>
import { ref } from 'vue'
import Input from '@/components/input/index.vue'

const value = ref('')
const password = ref('')
</script>

<template>
  <div class='input-demo'>
    <h3>基础输入框</h3>
    <Input v-model='value' placeholder='请输入内容' />
    <div>输入的值: {{ value }}</div>

    <h3>密码输入框</h3>
    <Input v-model='password' type='password' placeholder='请输入密码' />
    <div>密码值: {{ password }}</div>
  </div>
</template>