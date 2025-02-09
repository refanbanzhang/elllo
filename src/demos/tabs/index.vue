<script setup>
import { ref } from 'vue'
import Tabs from '@/components/tabs/index.vue'

const items = ref([
  {
    label: 'Home',
    icon: 'home'
  },
  {
    label: 'Search',
    icon: 'search'
  },
  {
    label: 'Settings',
    icon: 'settings'
  }
])

const modelValue = ref('Home')
</script>

<template>
  <div class='tabs-demo'>
    <h3>底部导航栏</h3>
    <div style='background: #000; padding: 20px'>
      <Tabs :items='items' v-model='modelValue' />
    </div>
  </div>
</template>