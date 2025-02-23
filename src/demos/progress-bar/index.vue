<script setup lang="ts">
import { ref } from "vue"
import ProgressBar from "@/components/progress-bar/index.vue"
import DemoBlock from "@/components/demo-block/index.vue"
import CodeBlock from "@/components/code-block/index.vue"

const value = ref(30)
const customValue = ref(60)

const basicUsageCode = "<ProgressBar :value=\"30\" />"

const customColorCode = `<ProgressBar
  :value="60"
  color="#67c23a"
  trackColor="#e6e6e6"
/>`
</script>

<template>
  <div class="progress-bar-demo">
    <!-- 组件说明 -->
    <div class="doc-section">
      <h2>进度条组件</h2>
      <p>用于展示操作进度的组件，提供基础样式和自定义样式。</p>
    </div>

    <!-- 基础用法 -->
    <div class="doc-section">
      <h3>基础用法</h3>
      <DemoBlock>
        <template #demo>
          <ProgressBar :value="value" />
          <div>进度: {{ value }}%</div>
        </template>
        <template #code>
          <CodeBlock :code="basicUsageCode" />
        </template>
      </DemoBlock>
    </div>

    <!-- 自定义颜色 -->
    <div class="doc-section">
      <h3>自定义颜色</h3>
      <DemoBlock>
        <template #demo>
          <ProgressBar
            :value="customValue"
            color="#67c23a"
            track-color="#e6e6e6"
          />
          <div>进度: {{ customValue }}%</div>
        </template>
        <template #code>
          <CodeBlock :code="customColorCode" />
        </template>
      </DemoBlock>
    </div>

    <!-- 属性说明 -->
    <div class="doc-section">
      <h3>属性说明</h3>
      <table class="props-table">
        <thead>
          <tr>
            <th>属性</th>
            <th>说明</th>
            <th>类型</th>
            <th>可选值</th>
            <th>默认值</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>value</td>
            <td>进度值</td>
            <td>number</td>
            <td>0-100</td>
            <td>0</td>
          </tr>
          <tr>
            <td>color</td>
            <td>进度条颜色</td>
            <td>string</td>
            <td>-</td>
            <td>#409eff</td>
          </tr>
          <tr>
            <td>trackColor</td>
            <td>轨道颜色</td>
            <td>string</td>
            <td>-</td>
            <td>#ebeef5</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.progress-bar-demo {
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