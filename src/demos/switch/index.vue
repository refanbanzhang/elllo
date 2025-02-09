<template>
  <div class="switch-demo">
    <div class="switch-list">
      <!-- 基础用法 -->
      <div class="switch-item">
        <el-switch v-model="isOn" />
        <span>开关状态: {{ isOn ? '开' : '关' }}</span>
      </div>

      <!-- 自定义颜色 -->
      <div class="switch-item">
        <el-switch
          v-model="isCustomColor"
          active-color="#13ce66"
          inactive-color="#ff4949"
        />
        <span>自定义颜色: {{ isCustomColor ? '开' : '关' }}</span>
      </div>

      <!-- 禁用状态 -->
      <div class="switch-item">
        <el-switch v-model="isDisabled" disabled />
        <span>禁用状态: {{ isDisabled ? '开' : '关' }}</span>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'

const isOn = ref(false)
const isCustomColor = ref(true)
const isDisabled = ref(false)
</script>

<style scoped>
.switch-demo {
  padding: 16px;
}

.switch-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.switch-item {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>