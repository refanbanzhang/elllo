<script setup>
import { ref } from 'vue'
import ProgressBar from '@/components/progress-bar/index.vue'

const value = ref(30)
const customValue = ref(60)
</script>

<template>
  <div class='progress-bar-demo'>
    <h3>基础进度条</h3>
    <ProgressBar :value='value' />
    <div>进度: {{ value }}%</div>

    <h3>自定义颜色</h3>
    <ProgressBar
      :value='customValue'
      color='#67c23a'
      trackColor='#e6e6e6'
    />
    <div>进度: {{ customValue }}%</div>
  </div>
</template>