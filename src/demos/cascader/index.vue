<script setup>
import { ref } from 'vue'
import Cascader from '@/components/cascader/index.vue'

const value = ref([])

const options = [
  {
    label: '广东省',
    value: 'guangdong',
    children: [
      {
        label: '广州市',
        value: 'guangzhou',
        children: [
          { label: '天河区', value: 'tianhe' },
          { label: '越秀区', value: 'yuexiu' }
        ]
      }
    ]
  },
  {
    label: '浙江省',
    value: 'zhejiang',
    children: [
      {
        label: '杭州市',
        value: 'hangzhou',
        children: [
          { label: '西湖区', value: 'xihu' },
          { label: '上城区', value: 'shangcheng' }
        ]
      }
    ]
  }
]
</script>

<template>
  <div class='cascader-demo'>
    <Cascader v-model='value' :options='options' placeholder='请选择地区' />
    <div>选中值: {{ value }}</div>
  </div>
</template>