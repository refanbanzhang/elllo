<script setup>
import { ref } from 'vue'
import DatePicker from '@/components/datePicker/index.vue'

const date = ref(new Date())
const dateRange = ref([])
</script>

<template>
  <div class='date-picker-demo'>
    <h3>单个日期</h3>
    <DatePicker v-model='date' />
    <div>选中日期: {{ date }}</div>

    <h3>日期范围</h3>
    <DatePicker v-model='dateRange' is-range />
    <div>选中范围: {{ dateRange }}</div>
  </div>
</template>