<script setup>
import { ref } from 'vue'
import Rate from '@/components/rate/index.vue'

const value = ref(3)
</script>

<template>
  <div class='rate-demo'>
    <Rate v-model='value' />
    <div>评分: {{ value }}</div>
  </div>
</template>