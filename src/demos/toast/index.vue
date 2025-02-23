<template>
  <div class="toast-demo">
    <!-- 组件说明 -->
    <div class="doc-section">
      <h2>轻提示组件</h2>
      <p>用于页面中展示重要的提示信息。</p>
    </div>

    <!-- 基础用法 -->
    <div class="doc-section">
      <h3>基础用法</h3>
      <DemoBlock>
        <template #demo>
          <Button @click="showBasicToast">基础提示</Button>
        </template>
        <template #code>
          <CodeBlock :code="basicCode" />
        </template>
      </DemoBlock>
    </div>

    <!-- 长文本 -->
    <div class="doc-section">
      <h3>长文本</h3>
      <DemoBlock>
        <template #demo>
          <Button @click="showLongToast">长文本提示</Button>
        </template>
        <template #code>
          <CodeBlock :code="longCode" />
        </template>
      </DemoBlock>
    </div>

    <!-- 自定义时长 -->
    <div class="doc-section">
      <h3>自定义时长</h3>
      <DemoBlock>
        <template #demo>
          <Button @click="showCustomDurationToast">自定义时长</Button>
        </template>
        <template #code>
          <CodeBlock :code="durationCode" />
        </template>
      </DemoBlock>
    </div>

    <!-- 加载提示 -->
    <div class="doc-section">
      <h3>加载提示</h3>
      <DemoBlock>
        <template #demo>
          <div class="btn-group">
            <Button @click="showLoadingToast">显示加载中</Button>
            <Button @click="hideLoadingToast">隐藏加载中</Button>
          </div>
        </template>
        <template #code>
          <CodeBlock :code="loadingCode" />
        </template>
      </DemoBlock>
    </div>

    <!-- 不同类型 -->
    <div class="doc-section">
      <h3>不同类型</h3>
      <DemoBlock>
        <template #demo>
          <div class="btn-group">
            <Button @click="showSuccessToast">成功提示</Button>
            <Button @click="showFailToast">失败提示</Button>
          </div>
        </template>
        <template #code>
          <CodeBlock :code="typeCode" />
        </template>
      </DemoBlock>
    </div>

    <!-- 方法说明 -->
    <div class="doc-section">
      <h3>方法说明</h3>
      <table class="props-table">
        <thead>
          <tr>
            <th>方法名</th>
            <th>说明</th>
            <th>参数</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>showToast</td>
            <td>显示提示</td>
            <td>options: { text: string, duration?: number, type?: string }</td>
          </tr>
          <tr>
            <td>hideToast</td>
            <td>隐藏提示</td>
            <td>-</td>
          </tr>
          <tr>
            <td>showLoading</td>
            <td>显示加载提示</td>
            <td>text: string</td>
          </tr>
          <tr>
            <td>hideLoading</td>
            <td>隐藏加载提示</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "@/components/button/index.vue"
import DemoBlock from "@/components/demo-block/index.vue"
import CodeBlock from "@/components/code-block/index.vue"
import { showToast, hideToast, showLoading, hideLoading } from "@/components/toast"

const showBasicToast = () => {
  showToast({ text: "这是一条基础提示" })
}

const showLongToast = () => {
  showToast({ text: "这是一条较长的提示文本，用来测试多行文本的显示效果" })
}

const showCustomDurationToast = () => {
  showToast({
    text: "我会显示5秒钟",
    duration: 5000
  })
}

const showLoadingToast = () => {
  showLoading("加载中...")
}

const hideLoadingToast = () => {
  hideLoading()
}

const showSuccessToast = () => {
  showToast({
    text: "操作成功",
    type: "success"
  })
}

const showFailToast = () => {
  showToast({
    text: "操作失败",
    type: "fail"
  })
}

const basicCode = `showToast({ text: "这是一条基础提示" })`

const longCode = `showToast({ 
  text: "这是一条较长的提示文本，用来测试多行文本的显示效果" 
})`

const durationCode = `showToast({
  text: "我会显示5秒钟",
  duration: 5000
})`

const loadingCode = `// 显示loading
showLoading("加载中...")

// 隐藏loading
hideLoading()`

const typeCode = `// 成功提示
showToast({
  text: "操作成功",
  type: "success"
})

// 失败提示
showToast({
  text: "操作失败", 
  type: "fail"
})`
</script>

<style scoped>
.toast-demo {
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
}

.doc-section {
  margin-bottom: 30px;
}

.doc-section h2 {
  font-size: 24px;
  margin-bottom: 16px;
}

.doc-section h3 {
  font-size: 20px;
  margin-bottom: 16px;
}

.btn-group {
  display: flex;
  gap: 10px;
}

.props-table {
  width: 100%;
  border-collapse: collapse;
}

.props-table th,
.props-table td {
  border: 1px solid #dcdfe6;
  padding: 12px;
  text-align: left;
}

.props-table th {
  background: #f5f7fa;
}
</style>