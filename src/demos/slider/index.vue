<script setup>
import { ref } from 'vue'
import Slider from '@/components/slider/index.vue'

const value = ref(50)
const rangeValue = ref([20, 80])
</script>

<template>
  <div class='slider-demo'>
    <h3>单滑块</h3>
    <Slider v-model='value' />
    <div>当前值: {{ value }}</div>

    <h3>范围滑块</h3>
    <Slider v-model='rangeValue' range />
    <div>当前范围: {{ rangeValue }}</div>
  </div>
</template>