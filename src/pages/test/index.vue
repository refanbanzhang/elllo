<script setup lang="ts">
import { ref } from 'vue'

const url = 'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg'

const classname = ref('image1')

const start = () => {
  classname.value = 'image2'
}
</script>

<template>
  <div>
    <img :class="classname" :src="url" alt="" @click="start">
  </div>
</template>

<style lang="less">
::view-transition-group(image) {
  animation-duration: 1s;
}

.image1 {
  width: 400px;
  height: 300px;
}

.image2 {
  width: 400px;
  height: 200px;
  transition: all 1s;
}
</style>
