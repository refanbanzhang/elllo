<template>
  <div class='toast-demo'>
    <div class='btn-group'>
      <Button @click='showBasicToast'>基础提示</Button>
      <Button @click='showLongToast'>长文本提示</Button>
      <Button @click='showCustomDurationToast'>自定义时长</Button>
      <Button @click='showLoadingToast'>显示加载中</Button>
      <Button @click='hideLoadingToast'>隐藏加载中</Button>
      <Button @click='showSuccessToast'>成功提示</Button>
      <Button @click='showFailToast'>失败提示</Button>
    </div>
  </div>
</template>

<script setup>
import Button from '@/components/button/index.vue'
import { showToast, hideToast, showLoading, hideLoading } from '@/components/toast'

const showBasicToast = () => {
  showToast({ text: '这是一条基础提示' })
}

const showLongToast = () => {
  showToast({ text: '这是一条较长的提示文本，用来测试多行文本的显示效果' })
}

const showCustomDurationToast = () => {
  showToast({
    text: '我会显示5秒钟',
    duration: 5000
  })
}

const showLoadingToast = () => {
  showLoading('加载中...')
}

const hideLoadingToast = () => {
  hideLoading()
}

const showSuccessToast = () => {
  showToast({
    text: '操作成功',
    type: 'success'
  })
}

const showFailToast = () => {
  showToast({ 
    text: '操作失败',
    type: 'fail'
  })
}
</script>

<style scoped>
.toast-demo {
  padding: 20px;
}

.btn-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.btn-group button {
  width: 100%;
}
</style>