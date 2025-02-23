<script setup lang="ts">
import Spinner from "@/components/spinner/index.vue"
import DemoBlock from "@/components/demo-block/index.vue"
import CodeBlock from "@/components/code-block/index.vue"

const basicCode = `<Spinner />`

const sizeCode = `<Spinner size="small" />
<Spinner />
<Spinner size="large" />`

const colorCode = `<Spinner color="#67c23a" />`
</script>

<template>
  <div class="spinner-demo">
    <!-- 组件说明 -->
    <div class="doc-section">
      <h2>加载中组件</h2>
      <p>用于页面和区块的加载中状态。</p>
    </div>

    <!-- 基础用法 -->
    <div class="doc-section">
      <h3>基础用法</h3>
      <DemoBlock>
        <template #demo>
          <Spinner />
        </template>
        <template #code>
          <CodeBlock :code="basicCode" />
        </template>
      </DemoBlock>
    </div>

    <!-- 不同尺寸 -->
    <div class="doc-section">
      <h3>不同尺寸</h3>
      <DemoBlock>
        <template #demo>
          <div class="spinner-list">
            <Spinner size="small" />
            <Spinner />
            <Spinner size="large" />
          </div>
        </template>
        <template #code>
          <CodeBlock :code="sizeCode" />
        </template>
      </DemoBlock>
    </div>

    <!-- 自定义颜色 -->
    <div class="doc-section">
      <h3>自定义颜色</h3>
      <DemoBlock>
        <template #demo>
          <Spinner color="#67c23a" />
        </template>
        <template #code>
          <CodeBlock :code="colorCode" />
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
            <td>size</td>
            <td>尺寸</td>
            <td>string</td>
            <td>small / default / large</td>
            <td>default</td>
          </tr>
          <tr>
            <td>color</td>
            <td>颜色</td>
            <td>string</td>
            <td>-</td>
            <td>#409eff</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.spinner-demo {
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

.spinner-list {
  display: flex;
  gap: 20px;
  align-items: center;
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